$('.rating-form-check').click(function () {
    $(`label.fa-solid.fa-star`).attr('style', 'display: none;');
    $(`label.fa-regular.fa-star`).attr('style', 'display: inline-block;');
    for (var j = 0; j < 5; j++) {
        if ($(`#rating-check-${j}`).is(':checked')) {
            $(`#rating-check-${j} ~ .fa-solid`).attr('style', 'display: inline-block;');
            $(`#rating-check-${j} ~ .fa-regular`).attr('style', 'display: none;');
            for (var k = 0; k < j; k++) {
                $(`#rating-check-${k} ~ .fa-solid`).attr('style', 'display: inline-block;');
                $(`#rating-check-${k} ~ .fa-regular`).attr('style', 'display: none;');
            }
        }
    }
})

$('#reset-review').click(function () {
    $(`label.fa-solid.fa-star`).attr('style', 'display: none;');
    $(`label.fa-regular.fa-star`).attr('style', 'display: inline-block;');
})

var product_id = document.getElementById('prod-id-sp').innerHTML;
var cart = JSON.parse(localStorage.getItem('cart'));

updateButtonsProd(cart);

$('.buy-add-item').on('click', '.plus-item', function () {
    if (cart[`pr-${product_id}`] != undefined) {
        cart[`pr-${product_id}`] = cart[`pr-${product_id}`] + 1
    } else {
        cart[`pr-${product_id}`] = 1;
    }

    updateCart(cart);
    updateCartCount(cart);
    updateProdDict();
    updateButtonsProd(cart);
    updateCartOffCanvas();
})

$('.buy-add-item').on('click', '.minus-item', function () {
    cart[`pr-${product_id}`] = Math.max(0, cart[`pr-${product_id}`] - 1);

    updateCart(cart);
    updateCartCount(cart);
    updateProdDict();
    updateButtonsProd(cart);
    updateCartOffCanvas();
})
