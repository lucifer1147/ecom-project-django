if (localStorage.getItem('cart') == null) {
    var cart = {}
} else {
    var cart = JSON.parse(localStorage.getItem('cart'))
    var items = Object.keys(cart).length
    if (items > 9) {
        items = '9+'
    }
    document.getElementById('cart-count').innerHTML = items
}
