# Generated by Django 4.2.5 on 2023-11-11 06:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Shop', '0008_alter_product_product_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='review',
            name='review_image',
            field=models.ImageField(default='', upload_to='Shop/images/reviews/<django.db.models.fields.related.ForeignKey>/'),
        ),
    ]
