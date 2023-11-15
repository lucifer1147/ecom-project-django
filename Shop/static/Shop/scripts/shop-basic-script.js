if (localStorage.getItem('cart') == null) {
    localStorage.setItem('cart', "{}");
}

var cart = JSON.parse(localStorage.getItem('cart'));

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

updateCartCount(cart)

const updateAddButtons = (cart) => {
    if (cart == null){
        cart = {};
    }
    for (const [item, count] of Object.entries(cart)) {
        document.getElementById(`sp-${item}`).innerHTML = `<a class="btn btn-primary cart cart-minus" id="minus-${item}">-</a>
                                                            <button class="val-btn btn btn-light disabled" id="val-${item}">${count}</button>
                                                            <a class="btn btn-primary cart cart-plus" id="plus-${item}">+</a>`;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

const updateCart = (cart) => {
    for (const [item, count] of Object.entries(cart)) {
        if (count == 0) {
            delete cart[item];
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart))
}

const updateCartOffCanvas = () => {
    dropdownBtn = document.getElementById('cart-offcanvas-dropdownMenuButton')

    var noItems = false;
    if (Object.keys(cart).length == 0) {
        offCanvasHeading = "You have no items in your cart. Add some to get started.";
        dropdownBtn.classList.add('disabled')
        noItems = true;
    } else {
        offCanvasHeading = "Items in your Cart:"
        dropdownBtn.classList.remove('disabled')
    }

    document.getElementById('cart-offcanvas-title').innerHTML = offCanvasHeading;

    content = "<hr>"

    var i = 1;
    for (const [item, count] of Object.entries(cart)) {
        cnt = `<div class="row cart-item-row">`;
        cnt = cnt + `<div class="sr-no">${i}</div>`
        cnt = cnt + `<img src="..." alt="..." class="prd-img">`
        cnt = cnt + `<div class="cart-desc">
                      Name: ${item}
                     </div>`

        cnt = cnt + `<div class="btn-group offcanvas-btngrp" id="btg-${item}">
                      <a class="btn btn-primary cart offcanvas-cart-minus" id="offcanvas-minus-${item}">-</a>
                      <button class="val-btn btn btn-light disabled" id="offcanvas-val-${item}">${count}</button>
                      <a class="btn btn-primary cart offcanvas-cart-plus" id="offcanvas-plus-${item}">+</a>                     
                     </div>`

        cnt = cnt + `</div>`
        content = content + cnt;

        i++;
    }

    document.getElementById('cart-offcanvas-body').innerHTML = content;

    $('.offcanvas-btngrp').on('click', '.offcanvas-cart-minus', function () {
        let prId = this.id.split("-");
        prId = "pr-" + prId[prId.length - 1];

        cart[prId] = Math.max(0, cart[prId] - 1);

        updateCart(cart);
        updateAddButtons(cart);
        updateCartCount(cart)
        updateCartOffCanvas();
    })

    $('.offcanvas-btngrp').on('click', '.offcanvas-cart-plus', function () {
        let prId = this.id.split("-");
        prId = "pr-" + prId[prId.length - 1];

        cart[prId] = cart[prId] + 1

        updateCart(cart);
        updateAddButtons(cart);
        updateCartCount(cart)
        updateCartOffCanvas();
    })

    $('#close-cart').click(function () {
        updateCart(cart);
        updateAddButtons(cart);
        updateCartCount(cart)
        updateCartOffCanvas();
    })
}

$('.navbar').on('click', '#cart-button', function () {
    updateCartOffCanvas()
})

// setInterval(updateCartOffCanvas(), 100)
