from django.db import models


class Product(models.Model):
    product_id = models.AutoField
    product_name = models.CharField(max_length=100, default="")
    product_price = models.FloatField(default=-1)

    product_image = models.ImageField(upload_to="Shop/images", default="")

    product_category = models.CharField(max_length=50, default="")
    product_subCategory = models.CharField(max_length=50, default="")
    product_description = models.CharField(max_length=1000, default="")

    product_publishDate = models.DateField()

    def __str__(self):
        return self.product_name
