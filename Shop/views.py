from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
    return render(request, 'Shop/index.html')


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
    pass
