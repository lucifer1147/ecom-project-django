from django.shortcuts import render
from django.http import HttpResponse
from .models import Product


# Create your views here.
def index(request):
    products = list(Product.objects.all())

    n = len(products) // 4 if len(products) % 4 == 0 else len(products) // 4 + 1
    idx = list(range(n))

    productsLi = []
    if n > 1:
        tempLi = []
        for i in range(len(products)):
            tempLi.append(products[i])
            if i == len(products)-1:
                productsLi.append(tempLi)
                tempLi = []
            elif len(tempLi) >= 4:
                productsLi.append(tempLi)
                tempLi = []
    else:
        productsLi.append(products)

    slides = zip(idx, productsLi)
    slides = list(item for item in slides)

    return render(request, 'Shop/index.html',
                  {'slides': slides,
                   'buttons': idx}
                  )

    # return render(request, 'Shop/index_old.html')


def about(request):
    return render(request, 'Shop/about.html')


def contact(request):
    return render(request, 'Shop/contact.html')


def track(request):
    return render(request, 'Shop/track.html')


def search(request):
    return render(request, 'Shop/search.html')


def product(request):
    return render(request, 'Shop/product.html')


def checkout(request):
    return render(request, 'Shop/checkout.html')
