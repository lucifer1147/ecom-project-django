// $('body').hover(function () {
//         console.log('hover')
//     updateAddButtons()
//     }
// )

$('.sp-pr-btn-grp').on("click", "a.cart-minus", function () {
    console.log('cl')
    let prId = this.id.split("-");
    prId = "pr-" + prId[prId.length - 1];

    cart[prId] = Math.max(0, cart[prId] - 1);

    updateAddButtons(cart);
    updateProdDict();
})

$('.sp-pr-btn-grp').on("click", "a.cart-plus", function () {
    console.log('ic')
    let prId = this.id.split("-");
    prId = "pr-" + prId[prId.length - 1];

    if (cart[prId] != undefined) {
        cart[prId] = cart[prId] + 1;
    } else {
        cart[prId] = 1;
    }

    updateAddButtons(cart);
    updateProdDict();
})


$('.sp-pr-btn-grp').on('click', '.cart', function () {

    localStorage.setItem('cart', JSON.stringify(cart));

    var items = 0;
    for (const [item, count] of Object.entries(cart)) {
        items = items + count;
    }

    if (items > 9) {
        items = '9+';
    }

    updateAddButtons(cart);
    updateProdDict();
    document.getElementById('cart-count').innerHTML = items;
})
