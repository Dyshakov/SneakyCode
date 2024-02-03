from django.shortcuts import render
from django.http import HttpResponse
from .models import Task
from io import StringIO
from django.db import connection
import sys
from django.shortcuts import redirect

def delete_task(request, task_id):
	Task.objects.filter(id=task_id).delete()
	return redirect(index)


def index(request):
	#sql запрос
	sql_query = "DELETE FROM taskapp_task WHERE id = 26"
	#Прием post запроса
	if request.method == "POST":
		with connection.cursor() as cursor:
			cursor.execute(sql_query)
		#Task.objects.filter(id=24).delete()

	task = Task.objects.all()
	myname = request.GET.get("myname")
	name = [myname, "Dima", "Valera", "Anna"]
	data = Task.objects.all()

	return render(request, 'index.html', {"name": name, "data": task})

def add(request):
	return render(request, 'add.html')

def postuser(request):
	task_name = request.POST.get("task-name", "Undefined")
	task_description = request.POST.get("task-description", 1)
	task = Task.objects.create(name=task_name, define=task_description)
	return redirect(index)

def about(request):
	return render(request, "about.html")

def code(request, code):
	output = "default_output"
	text_area_value = '#Write your python code here'
	if code != 'default_code':
		task = Task.objects.get(id=code)
		text_area_value = task.define.replace('<br>', '')

	if request.method == "POST":
		if "run" in request.POST:	
			text_area_value = request.POST.get('active_tabContent')

			captured_output = StringIO()
			sys.stdout = captured_output

			exec(text_area_value)
			output = captured_output.getvalue()
		if "save" in request.POST:
			text_area_value = request.POST.get('active_tabContent')
			saved_code = text_area_value.replace('\n', '<br>') #Заменяем символы переноса строки на HTML теги <br>
			file_name = request.POST.get('file_name')
			task = Task.objects.create(name=file_name, define=saved_code)  #Создаем новую строчку в таблице taskapp_task и записываем в нее наш код
	return render(request, "code.html", {"output": output , "text_content": text_area_value})


