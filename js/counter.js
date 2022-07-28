//Get cart wrapper
const cartWrapper = document.querySelector('.cart-wrapper');

//Click listener for whole window
window.addEventListener('click', clickHandler);

hoverEvent();

function hoverEvent() {
    const cartItem = cartWrapper.querySelectorAll('.cart-item');

    if(cartItem) {
        for (let i = 0; i < cartItem.length; i++) {
            createDelete(cartItem[i]);
        };   
    }
};

function createDelete (cartItem) {

    const deleteBtn = cartItem.querySelector('[data-action="delete"]');

    cartItem.addEventListener('mouseover', function () {

        deleteBtn.classList.remove("unhover");
        deleteBtn.classList.add("whenHover");
    });
    
    cartItem.addEventListener('mouseout', function () {

        deleteBtn.classList.remove("whenHover");
        deleteBtn.classList.add("unhover");
    });

    deleteBtn.addEventListener('click', function(event) {
        event.target.closest('.cart-item').remove();
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


    }
};

//Increment or decrement counter on click
function counterHandler(event) {

    //Get counter container for event
    const counterWrapper = event.target.closest('.counter-wrapper');
    const counter = counterWrapper.querySelector('[data-counter]');

    //Check if was clicked plus btn
    if (event.target.dataset.action === 'plus') {
    
        //Chek if order not too big.
        //Think that it more needed in shopping cart, so ill chnge it later
        if(counter.innerHTML < 15) {
            counter.innerHTML = ++counter.innerHTML;
        } else {
            alert('Woah! It seems that Your order needs a bit more of our attention. Let our manager get in touch with You');
        }

    //Check if was clicked minus btn
    } else if (event.target.dataset.action === 'minus') {

        // Check if counter can be decremented (more than 1)
        if(counter.innerHTML > 1) {
        counter.innerHTML = --counter.innerHTML;
        }
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

        //Summerise counter
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

        const itemInCart = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`);
        createDelete (itemInCart);
    }



    card.querySelector('[data-counter]').innerHTML = 1;
};

