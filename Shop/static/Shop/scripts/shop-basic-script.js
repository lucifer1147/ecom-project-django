if (localStorage.getItem('cart') == null) {
    localStorage.setItem('cart', "{}");
}

var cart = JSON.parse(localStorage.getItem('cart'));
var items = 0;
for (const [item, count] of Object.entries(cart)) {
    items = items + count;
}

if (items > 9) {
    items = '9+';
}

document.getElementById('cart-count').innerHTML = items;

const updateCartOffCanvas = () => {
    console.log('updating..')
    dropdownBtn = document.getElementById('cart-offcanvas-dropdownMenuButton')

    var noItems = false;
    if (Object.keys(cart).length == 0) {
        offCanvasHeading = "You have no items in your cart. Add some to get started.";
        dropdownBtn.classList.add('disabled')
        console.log('adding..')
        noItems = true;
    } else {
        offCanvasHeading = "Items in your Cart:"
        dropdownBtn.classList.remove('disabled')
        console.log('removin..')
    }

    console.log(dropdownBtn.classList)

    document.getElementById('cart-offcanvas-title').innerHTML = offCanvasHeading;

    content = "<hr>"

    var i = 1;
    for (const[item, count] of Object.entries(cart)) {
        cnt = `<div class="row cart-item-row">`;
        cnt = cnt + `<div class="sr-no">${i}</div>`
        cnt = cnt + `<img src="..." alt="..." class="prd-img"></img>`
        cnt = cnt + `<div class="cart-desc">
                      Name: ${item}
                     </div>`


        cnt = cnt + `</div>`
        content = content + cnt;
    }

    console.log(noItems)
    document.getElementById('cart-offcanvas-body').innerHTML = content;
}

setInterval(updateCartOffCanvas(), 100)
