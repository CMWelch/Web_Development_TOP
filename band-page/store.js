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