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

def code(request):
	output = "default_output"
	text_area_value = "#Write your python code here"
	if request.method == "POST":
		if "run" in request.POST:	
			text_area_value = request.POST.get('my_text_area')

			captured_output = StringIO()
			sys.stdout = captured_output

			exec(text_area_value)
			output = captured_output.getvalue()
		if "save" in request.POST:
			text_area_value = request.POST.get('my_text_area')
			task = Task.objects.create(name="код", define=text_area_value)
	return render(request, "code.html", {"output": output , "text_content": text_area_value})


