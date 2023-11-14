if (localStorage.getItem('cart') == null) {
    localStorage.setItem('cart', "{}")
}

var cart = JSON.parse(localStorage.getItem('cart'))
var items = 0;
for (const [item, count] of Object.entries(cart)) {
    items = items + count;
}

if (items > 9) {
    items = '9+'
}

document.getElementById('cart-count').innerHTML = items;
