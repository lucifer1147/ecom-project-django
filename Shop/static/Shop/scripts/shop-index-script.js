$('.cart').click(function () {
    var idstr = this.id.toString()
    if (cart[idstr] != undefined) {
        cart[idstr] = cart[idstr] + 1
    } else {
        cart[idstr] = 1
    }

    localStorage.setItem('cart', JSON.stringify(cart))

    var items = 0;
    for (const [item, count] of Object.entries(cart)) {
        items = items + count;
    }

    if (items > 9) {
        items = '9+'
    }

    document.getElementById('cart-count').innerHTML = items
})
