# Generated by Django 4.1.1 on 2022-11-01 16:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vendor', '0006_alter_openinghour_options_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='openinghour',
            name='day',
            field=models.IntegerField(choices=[(1, 'Monday'), (2, 'Tuesday'), (3, 'Wednesday'), (4, 'Thursday'), (5, 'Friday'), (6, 'Saturday'), (7, 'Sunday')]),
        ),
    ]
