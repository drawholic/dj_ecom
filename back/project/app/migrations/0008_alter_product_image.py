# Generated by Django 3.2.13 on 2022-08-08 00:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0007_alter_product_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.FileField(default='', upload_to='product_images'),
        ),
    ]
