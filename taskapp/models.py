from django.db import models

class Task(models.Model):
	name = models.CharField(max_length=20)
	define = models.CharField(max_length=50)
