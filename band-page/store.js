if(document.readyState == 'loading')
{
    document.addEventListener('DOMContentLoaded', ready);
}
else 
{
    ready();
}

function ready()
{
    let removeCartItemsBtns = document.getElementsByClassName('cart-btn');
    for(let i = 0; i < removeCartItemsBtns.length; i++)
    {
        let button = removeCartItemsBtns[i];
        button.addEventListener('click', removeCartItem);
    }

    let quantityInputs = document.getElementsByClassName('cart-input');
    for(let i = 0; i < quantityInputs.length; i++)
    {
        let input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    let addToCart = document.getElementsByClassName('store-btn');
    for(let i = 0; i < addToCart.length; i++)
    {
        let button = addToCart[i];
        button.addEventListener('click', addItemToCartClicked);
    }

    document.getElementsByClassName('purchase-btn')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() 
{
    alert('Thank you for your purchase');
    let items = document.getElementsByClassName('cart-items')[0];
    while(items.hasChildNodes())
    {
        items.removeChild(items.firstChild);
    }
    updateCartTotal();
}

function addItemToCartClicked(event)
{
    let button = event.target;
    let storeItem = button.parentElement.parentElement;

    let title = storeItem.getElementsByClassName('store-item-title')[0].innerText;
    let image = storeItem.getElementsByClassName('store-item-image')[0].src;
    let price = storeItem.getElementsByClassName('store-item-price')[0].innerText;

    console.log(image);
    addItemToCart(title, image, price);
    updateCartTotal();
}

function addItemToCart(title, image, price)
{
    let cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    let cartItems = document.getElementsByClassName('cart-items')[0];

    let cartItemNames = cartItems.getElementsByClassName('cart-item-title');

    for(let i = 0; i < cartItemNames.length; i++)
    {
        if(cartItemNames[i].innerText == title)
        {
            alert('Item already added to cart');
            return;
        }
    }

    let cartRowContents = 
    `<div class="cart-item cart-column">
        <img src="${image}" width="50" height="50">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-input" type="number" value="1">
        <button class="btn cart-btn">REMOVE</button>
    </div>`;

    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);

    let button = cartRow.getElementsByClassName('cart-btn')[0];
    button.addEventListener('click', removeCartItem);

    let quantityInputs = document.getElementsByClassName('cart-input');
    button.addEventListener('change', quantityChanged);
}

function quantityChanged(event)
{
    let input = event.target;
    if(isNaN(input.value) || input.value <= 0)
    {
        input.value = 1;
    }

    updateCartTotal();
}

function calculateCartRowPrice(cartRow)
{
    let priceElement = cartRow.getElementsByClassName('cart-price')[0];
    let quantityElement = cartRow.getElementsByClassName('cart-input')[0];

    let price = parseFloat(priceElement.innerText.replace('$', ''));
    let quantity = quantityElement.value;

    let priceChange = price * quantity;
    
    return priceChange;
}

function removeCartItem(event) 
{
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

function updateCartTotal() 
{
    let cartRows = document.getElementsByClassName('cart-row');
    let total = 0;
    for(let i = 1; i < cartRows.length; i++)
    {
        total = total + calculateCartRowPrice(cartRows[i]);
    }

    total = Math.round(total * 100)/100;

    let totalElement = document.getElementsByClassName('cart-total')[0];
    totalElement.getElementsByTagName('span')[1].innerText = '$' + total;
}