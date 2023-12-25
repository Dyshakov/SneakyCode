from django.contrib import admin
from django.urls import path
from taskapp import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index),
    path('add_task', views.add),
    path('postuser/', views.postuser),
    path('about/', views.about),
    path('code/<str:code>', views.code),
    path('delete_task/<int:task_id>', views.delete_task)
]
