//Get cart wrapper
const cartWrapper = document.querySelector('.cart-wrapper');

//Register events
function init () {

    const cartItem = cartWrapper.querySelectorAll('.cart-item');

    //Click listener for whole window
    window.addEventListener('click', clickHandler);

    //Check for remaining items from last session
    if(cartItem) {
        for (item of cartItem) {

            hoverDelete(item);
        }
    }
    
};

//
function hoverDelete (item) {

    const deleteBtn = item.querySelector('[data-action="delete"]');

    item.addEventListener('mouseover', function () {

        deleteBtn.classList.remove("unhover");
        deleteBtn.classList.add("whenHover");
    });
    
    item.addEventListener('mouseout', function () {

        deleteBtn.classList.remove("whenHover");
        deleteBtn.classList.add("unhover");
    });

};

function clickHandler (event) {

    //Check if was clicked cart btn
    if  (event.target.hasAttribute('data-cart') === true) {

        cartHandler(event);

    //Check if was counter controls    
    } else if (event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus') {
        
        counterHandler(event);
    } else if (event.target.dataset.action === 'delete') {

        removeItem(event);
    }
};

//Remove item from card, calculate price
function removeItem (event) {

    event.target.closest('.cart-item').remove();
    calculateTotal();
    toggleCart();
};

//Increment or decrement counter on click
function counterHandler(event) {

    //Get counter container for event
    const counterWrapper = event.target.closest('.counter-wrapper');
    const counter = counterWrapper.querySelector('[data-counter]');

    //Check if was clicked plus btn
    if (event.target.dataset.action === 'plus') {
    
        counter.innerHTML = ++counter.innerHTML;

        if (event.target.closest('.cart-wrapper')) {
            calculateTotal();
        }

    //Check if was clicked minus btn
    } else if (event.target.dataset.action === 'minus') {

        if (parseInt(counter.innerText) > 1) {

            counter.innerHTML = --counter.innerHTML;

            if (event.target.closest('.cart-wrapper')) {

                calculateTotal();
            }
        
        
        } else if (parseInt(counter.innerText) === 1) {

            if (event.target.closest('.cart-wrapper')) {

                removeItem(event);
            }
        }        
    }
};

function toggleCart() {

    const lastItem = cartWrapper.querySelector('.cart-item');

    if (lastItem) {

    } else {
        const form = document.getElementById('order-form');
        form.classList.add('none');
        document.querySelector('[data-cart-empty]').classList.remove('none');
    }
};

function cartHandler(event) {

    //Get card container
    const card = event.target.closest('.card');

    //Save product data as object
    const productInfo = {
        id: card.dataset.id,
        imgSrc: card.querySelector('.product-img').getAttribute('src'),
        title: card.querySelector('.item-title').innerText,
        itemsInBox: card.querySelector('[data-items-in-box]').innerText,
        weight: card.querySelector('.price__weight').innerText,
        price: card.querySelector('.price__currency').innerText,
        counter: card.querySelector('[data-counter]').innerText,

    };

    //Check if currentproduct is already placed in cart
    const itemInCart = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`);

    //Check if current product is already placed in cart
    if (itemInCart) {

        //Get item counter
        const counterOfItem = itemInCart.querySelector('[data-counter]');

        //Summarise counter
        counterOfItem.innerHTML = +productInfo.counter + +counterOfItem.innerHTML;

    //Create new item if product wasnt in cart     
    } else {

        //Const to append product information
        const cartItemHTML = `<div class="cart-item" data-id="${productInfo.id}">
                                <div class="cart-item__top position-relative">
                                    <div class="cart-item__img">
                                        <img src="${productInfo.imgSrc}" alt="">
                                    </div>
                                    <div class="cart-item__desc">
                                        <div class="cart-item__title">${productInfo.title}</div>
                                        <div class="cart-item__weight">${productInfo.itemsInBox} / ${productInfo.weight}</div>

                                        <!-- cart-item__details -->
                                        <div class="cart-item__details">

                                            <div class="items items--small counter-wrapper">
                                                <div class="items__control" data-action="minus">-</div>
                                                <div class="items__current" data-counter="">${productInfo.counter}</div>
                                                <div class="items__control" data-action="plus">+</div>
                                            </div>

                                            <div class="price">
                                                <div class="price__currency">${productInfo.price}</div>
                                            </div>

                                        </div>
                                        <!-- // cart-item__details -->
                                    </div>
                                    <div class="item__delete unhover" data-action="delete">x</div>
                                </div>
                            </div>`;

        //Append new product into cart
        cartWrapper.insertAdjacentHTML('beforeend', cartItemHTML);

        const form = document.getElementById('order-form');

        

        if (form.classList.contains('none')) {

            form.classList.remove('none');
            document.querySelector('[data-cart-empty]').classList.add('none');
        }

        const itemInCart = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`);
        hoverDelete (itemInCart);
    }

    calculateTotal();

    card.querySelector('[data-counter]').innerHTML = 1;
};

function calculateTotal () {
    let summ = 0;
    const allCartItems = cartWrapper.querySelectorAll('.cart-item');

    if (allCartItems) {

        for (item of allCartItems) {
            let price = parseInt(item.querySelector('.price__currency').innerText);
            let amount = parseInt(item.querySelector('[data-counter]').innerText);
            let subTotal = price * amount;
            summ += subTotal;
        }
    
        document.querySelector('.total-price').innerText = summ;
    }
    
};
