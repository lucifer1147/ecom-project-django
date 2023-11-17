from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from .models import Product, Review, Contact


# Create your views here.
def index(request):
    productsAll = list(Product.objects.all())
    slidesLi = []

    products_catwise = {}

    for curProd in productsAll:
        if curProd.product_category.lower() in products_catwise.keys():
            products_catwise[curProd.product_category.lower()].append(curProd)
        else:
            products_catwise.update({curProd.product_category.lower(): [curProd]})

    for products in list(products_catwise.values()):

        n = len(products) // 4 if len(products) % 4 == 0 else len(products) // 4 + 1
        idx = list(range(n))

        productsLi = []
        if n > 1:
            tempLi = []
            for i in range(len(products)):
                tempLi.append(products[i])
                if i == len(products) - 1:
                    productsLi.append(tempLi)
                    tempLi = []
                elif len(tempLi) >= 4:
                    productsLi.append(tempLi)
                    tempLi = []
        else:
            productsLi.append(products)

        slides = zip(idx, productsLi)
        slides = list(item for item in slides)

        slidesLi.append(slides)

    rng = range(1, len(list(products_catwise.keys())) + 1)
    slidesLi = list(item for item in zip(rng, list(products_catwise.keys()), slidesLi))

    return render(request, 'Shop/index.html',
                  {'slidesLi': slidesLi}
                  )


def about(request):
    return render(request, 'Shop/about.html')


def contact(request):
    if request.method == 'POST':
        post = request.POST
        name = str(post.get('f-name')) + " " + str(request.POST.get('l-name'))
        email = str(post.get('email'))
        phone = str(post.get('phone'))

        pic = post.get('uploaded-pic')
        issue = str(post.get('issue'))

        updates = post.get('updates', 'no')

        issue = Contact.objects.create(name=name, email=email, phone=phone, pic=pic, query=issue, getUpdates=updates)
        issue.save()

    return render(request, 'Shop/contact.html')


def track(request):
    return render(request, 'Shop/track.html')


def search(request):
    return render(request, 'Shop/search.html')


def product(request, id):
    curProduct = Product.objects.filter(id=id)[0]

    offerrange = list(range(1, 8))
    detailsrange = list(range(1, 15))

    reviews = Review.objects.filter(review_product=curProduct)

    return render(request, 'Shop/product.html',
                  {'product': curProduct, 'offerrange': offerrange, 'detailsrange': detailsrange,
                   'reviewsrange': reviews, 'range': range})


def checkout(request):
    if request.method == 'GET':
        cart = request.GET.get('products')
        print(cart)

    return render(request, 'Shop/checkout.html')


def postreview(request, prodid):
    if request.method == 'POST':
        post = request.POST

        username = str(post.get('UserName', 'Anonymous'))
        useremail = str(post.get('UserEmail'))
        review = str(post.get('ReviewContent'))
        rating = int(post.get('rating-radio', '-1'))
        image = post.get('reviewimage')

        rev = Review.objects.create(review_user=username, review_user_email=useremail, review_user_location="",
                                    review=review, ratings=rating+1, review_product=Product.objects.filter(id=prodid)[0],
                                    review_image=image)
        rev.save()

    return redirect(f'/shop/product/{prodid}#rev-cont')


def getdetails(request, prodid):
    prod = Product.objects.filter(id=prodid)[0]

    response = {
        'name': prod.product_name,
        'image': str(prod.product_image),
        'price': prod.product_price,
    }
    return JsonResponse(response)
