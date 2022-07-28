

// Get control elements
const btnMinus = document.querySelector('[data-action="minus"]');
const btnPlus = document.querySelector('[data-action="plus"]');
const counter = document.querySelector('[data-counter]');


// Click event on minus control
btnMinus.addEventListener('click', function() {
    

    // Check if counter can be decremented (more than 1)
    if(counter.innerHTML > 1) {
        counter.innerHTML = --counter.innerHTML;
    }
    
});


//Click event on plus control
btnPlus.addEventListener('click', function() {


    //Chek if order not too big.
    //Think that it more needed in shopping cart, so ill chnge it later
    if(counter.innerHTML < 30) {
        counter.innerHTML = ++counter.innerHTML;
    } else {
        alert('Woah! It seems that Your order needs a bit more of our attention. Let our manager get in touch with You');
    }
    
});

