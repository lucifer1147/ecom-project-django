from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="ShopHome"),
    path("about/", views.about, name="ShopAbout"),
    path("contact/", views.contact, name="ShopContact"),
    path("track/", views.track, name="ShopTracker"),
    path("search/", views.search, name="ShopSearch"),
    path("product/<int:id>", views.product, name="ShopProduct"),
    path("checkout/", views.checkout, name="ShopCheckout")
]
