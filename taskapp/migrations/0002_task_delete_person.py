# Generated by Django 5.0 on 2023-12-12 20:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('taskapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20)),
                ('define', models.CharField(max_length=50)),
            ],
        ),
        migrations.DeleteModel(
            name='Person',
        ),
    ]
