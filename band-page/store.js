let removeCartItemsBtns = document.getElementsByClassName('cart-btn');
console.log(removeCartItemsBtns);

for(let i = 0; i < removeCartItemsBtns.length; i++)
{
    let button = removeCartItemsBtns[i];
    button.addEventListener('click', function(event) {
        let buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove()
        updateCartTotal()    
    })
}

function updateCartTotal() 
{
    let cartRows = document.getElementsByClassName('cart-row')
    let total = 0
    for(let i = 1; i < cartRows.length; i++)
    {
        let cartRow = cartRows[i]
        let priceElement = cartRow.getElementsByClassName('cart-price')[0]
        let quantityElement = cartRow.getElementsByClassName('cart-input')[0]

        let price = priceElement.innerText.replace('$', '')
        let quantity = quantityElement.value
        
        let priceChange = price * quantity

        total = total + priceChange
    }

    let totalElement = document.getElementsByClassName('cart-total')[0]
    totalElement.getElementsByTagName('span')[1].innerText = '$' + total
}