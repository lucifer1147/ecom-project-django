// const updateAddButtons = (cart) => {
//     if (cart == null){
//         cart = {};
//     }
//     for (const [item, count] of Object.entries(cart)) {
//         document.getElementById(`sp-${item}`).innerHTML = `<a class="btn btn-primary cart cart-minus" id="minus-${item}">-</a>
//                                                             <button class="val-btn btn btn-light disabled" id="val-${item}">${count}</button>
//                                                             <a class="btn btn-primary cart cart-plus" id="plus-${item}">+</a>`;
//     }
//
//     localStorage.setItem('cart', JSON.stringify(cart));
// }

setInterval(updateAddButtons(cart), 10);

$('.sp-pr-btn-grp').on("click", "a.cart-minus", function () {
    let prId = this.id.split("-");
    prId = "pr-"+prId[prId.length-1];

    cart[prId] = Math.max(0, cart[prId] - 1);


    if (cart[prId] == 0) {
        delete cart[prId];
        document.getElementById(`sp-${prId}`).innerHTML = `<a id="pr-${prId.slice(3,)}" class="btn btn-primary cart cart-plus">Add to Cart</a>`;
    };

    updateAddButtons(cart);
})

$('.sp-pr-btn-grp').on("click", "a.cart-plus", function () {
    let prId = this.id.split("-");
    prId = "pr-"+prId[prId.length-1];

    if (cart[prId] != undefined) {
        cart[prId] = cart[prId] + 1;
    } else {
        cart[prId] = 1;
    }

    updateAddButtons(cart);
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
    document.getElementById('cart-count').innerHTML = items;
})
