const clearCart = () => {
    cart = {}
    localStorage.setItem('cart', JSON.stringify({}))

    updateCart(cart);
    updateAddButtons(cart);
    updateCartCount(cart)
    updateProdDict();
    updateCartOffCanvas();
}

const updateCartCount = (cart) => {
    var items = 0;
    for (const [item, count] of Object.entries(cart)) {
        items = items + count;
    }

    if (items > 9) {
        items = '9+';
    }

    document.getElementById('cart-count').innerHTML = items;
}

const updateAddButtons = () => {
    for (const [item, count] of Object.entries(cart)) {
        if (count > 0) {
            document.getElementById(`sp-${item}`).innerHTML = `<a class="btn btn-primary cart cart-minus" id="minus-${item}">-</a>
                                                            <button class="val-btn btn btn-light cart-disabled" id="val-${item}"><strong>${count}</strong></button>
                                                            <a class="btn btn-primary cart cart-plus" id="plus-${item}">+</a>`;
        } else {
            document.getElementById(`sp-${item}`).innerHTML = `<a id="${item}" class="btn btn-primary cart cart-plus">Add to Cart</a>`;
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

const updateCart = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
}

const updateProdDict = () => {
    for (const [item, count] of Object.entries(cart)) {
        if (count > 0) {
            let idNum = item.split('-');
            idNum = idNum[idNum.length - 1];

            $.ajax({
                url: `/shop/prod-details/${idNum}`,
                success: function (result) {
                    prodDict[`pr-${idNum}`] = result;
                }
            })
        }
    }

    for (const [item, details] of Object.entries(prodDict)) {
        if (cart[item] == 0) {
            delete prodDict[item];
        }
    }
}

setInterval(updateProdDict, 100)

const updateButtonsProd = (cart) => {
    if (Object.keys(cart).includes(`pr-${product_id}`) && cart[`pr-${product_id}`] > 0) {
        var count = cart[`pr-${product_id}`];
        var item = `pr-${product_id}`;
        var cnt = `<button class="btn btn-light cart minus-item" id="minus-item-${item}">-</button>
                   <button class="val-btn btn btn-light cart-disabled" id="val-item-${item}"><strong>${count}</strong></button>
                   <button class="btn btn-light cart plus-item" id="plus-item-${item}">+</button>`;
        document.getElementById('b-a-it').innerHTML = cnt;
    } else {
        var cnt = `<button class="btn btn-light text-dark col-md-6"><strong>Buy Now</strong></button>
                   <button class="btn btn-light text-dark col-md-6 plus-item"><strong>Add To Cart</strong></button>`;
        document.getElementById('b-a-it').innerHTML = cnt;
    }

}

const updateCartOffCanvas = () => {
    dropdownBtn = document.getElementById('cart-offcanvas-dropdownMenuButton');

    itc = 0;
    for (const [item, count] of Object.entries(cart)) {
        itc = itc + count;
    }

    if (itc <= 0) {
        offCanvasHeading = "You have no items in your cart. Add some to get started.";
        for (elem of Array.from(dropdownBtn.parentElement.children[1].children)) {
            elem.children[0].classList.add('disabled');
        }
    } else {
        offCanvasHeading = "Items in your Cart:";
        for (elem of Array.from(dropdownBtn.parentElement.children[1].children)) {
            elem.children[0].classList.remove('disabled');
        }
    }

    document.getElementById('cart-offcanvas-title').innerHTML = offCanvasHeading;

    content = "<hr>";

    var i = 1;
    for (const [item, count] of Object.entries(cart)) {
        if (count > 0) {
            cnt = `<div class="row cart-item-row">`;
            cnt = cnt + `<div class="sr-no">${i}</div>`;
            cnt = cnt + `<div class="cart-item-img"><img src="/media/${prodDict[item]['image']}" alt="..." class="prd-img"></div>`;
            cnt = cnt + `<div class="cart-desc">
                         <strong>${prodDict[item]['name']}</strong>
                         </div>`;

            cnt = cnt + `<div class="btn-group offcanvas-btngrp" id="btg-${item}">
                          <a class="btn btn-primary cart offcanvas-cart-minus" id="offcanvas-minus-${item}">-</a>
                          <button class="val-btn btn btn-light cart-disabled" id="offcanvas-val-${item}"><strong>${count}</strong></button>
                          <a class="btn btn-primary cart offcanvas-cart-plus" id="offcanvas-plus-${item}">+</a>                     
                         </div>`;

            cnt = cnt + `</div>`;
            content = content + cnt;
            i++;

        }
    }

    document.getElementById('cart-offcanvas-body').innerHTML = content;


    $('.offcanvas-btngrp').on('click', '.offcanvas-cart-minus', function () {
        let prId = this.id.split("-");
        prId = "pr-" + prId[prId.length - 1];
        cart[prId] = Math.max(0, cart[prId] - 1);

        updateAll(lct);
    })

    $('.offcanvas-btngrp').on('click', '.offcanvas-cart-plus', function () {
        let prId = this.id.split("-");
        prId = "pr-" + prId[prId.length - 1];
        cart[prId] = cart[prId] + 1;

        updateAll(lct);
    })

    $('#close-cart').click(function () {
        updateAll(lct);
    })

    $('.cart-dropdown').on('click', 'a.clear-cart', function () {
        clearCart();
    })
}

const updateAll = (lct) => {
    updateCart(cart);
    updateCartCount(cart);
    updateProdDict();
    if (lct[lct.length - 1] == 'shop') {
        updateAddButtons(cart);
    } else if (lct[lct.length - 2] == 'product') {
        updateButtonsProd(cart);
    }
    updateCartOffCanvas();
}


if (localStorage.getItem('cart') == null) {
    localStorage.setItem('cart', "{}");
}

var lct = window.location.href.split('/').filter(function (val) {
    if (val != '') {
        return true;
    }
})

var cart = JSON.parse(localStorage.getItem('cart'));
var prodDict = {};

for (const [item, count] of Object.entries(cart)) {
    if (count <= 0) {
        delete cart[item];
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

updateAll(lct);

$('.navbar').on('click', '#cart-button', function () {
    updateAll(lct);
})
