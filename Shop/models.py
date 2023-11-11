from django.db import models
from django.utils import timezone


class Product(models.Model):
    # product_id = models.AutoField(primary_key=True)
    product_name = models.CharField(max_length=100, default="")
    product_price = models.FloatField(default=-1)

    product_image = models.ImageField(upload_to="Shop/images/product/", default="")

    product_category = models.CharField(max_length=50, default="")
    product_subCategory = models.CharField(max_length=50, default="")
    product_description = models.CharField(max_length=1000, default="")

    product_publishDate = models.DateField()

    def __str__(self):
        return self.product_name


class Review(models.Model):
    class ReviewRating(models.IntegerChoices):
        WORST = 0, 'WORST'
        VERY_BAD = 1, 'VERY BAD'
        BAD = 2, 'BAD'
        AVERAGE = 3, 'AVERAGE'
        GOOD = 4, 'GOOD'
        EXCELLENT = 5, 'EXCELLENT'

    review_user = models.CharField(max_length=100, default="Anonymous")
    review_user_email = models.CharField(max_length=100, default="")
    review_user_location = models.CharField(max_length=100, default="")

    review_date = models.DateField(default=timezone.now)
    review = models.CharField(max_length=1000, default="")

    ratings = models.IntegerField(choices=ReviewRating.choices, default=ReviewRating.AVERAGE)
    review_product = models.ForeignKey(Product, on_delete=models.CASCADE)

    review_image = models.ImageField(upload_to=f"Shop/images/reviews/{str(review_product)}/", default="")

    def __str__(self):
        return self.review_user + " " + str(self.review_product)
