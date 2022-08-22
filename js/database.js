function database() {
    userbase.init({ appId: '3f437452-5213-4dbe-9500-45cef6c70c21' })
        .then((session) => session.user ? showProfile(session.user) : showAuth())
        .catch(() => showAuth())
        .finally(() => document.getElementById('loader').classList.add('none'))
};
   

function showProfile (user) {

    // function database() {
    //     userbase.openDatabase({
    //     databaseName: `orders`, changeHandler: function () {
    //     console.log('good')}
    //         .then(() => {let obj = { timeone: 'nnn', two2: 'xxx', free: true, six: { six: 'fff', inner: true, crazy: 'strange'}};
        
    //     userbase.insertItem({
    //     databaseName: 'example-database-name',
    //     item: {obj}
    //         }).then(() => {
    //       // item inserted
    //     }).catch((e) => console.error(e))
                
    //         })
        
        
    //     });
    //     }
        
    //     database();

    // userbase.openDatabase({
    //     databaseName: 'commonBase',
    //     commonBasechange: function (items) {
            
    
    //       console.log('New order posted!')
    //     }
    //   }).then((items) => {
    //     let commonOrderNum = items.length + 1;
        
    //   }).catch((e) => console.error(e))

      userbase.openDatabase({
        databaseName: `${user.usename} orders`,
        changeHandler: function (items) {
          console.log('New order posted!')
        }
      }).then((items) => {
        let orderNum = items.length + 1;
        
      }).catch((e) => console.error(e))
    
    //   checkCurrentOrder();

    const profile = document.getElementById('profile-card');
    const greeting =  profile.querySelector('.h5');
    const form = document.getElementById('order-form');

    document.getElementById('loader').classList.add('none');  
    document.getElementById('signup-section').classList.add('none');
    document.getElementById('signin-section').classList.add('none');
    document.getElementById('db-error').innerText = '';
    document.getElementById('login-error').innerText = '';
    document.getElementById('signup-error').innerText = '';

    let name = document.createTextNode(`, ${user.profile.firstName}!`);
    
    
    

    greeting.appendChild(name);
    profile.classList.remove('none');


    if ( !!user.profile.homeAddress ) {
        document.getElementById('address').value = user.profile.addresses.homeAddress;
    }

    if (document.querySelector('.cart-wrapper').childNodes.length > 1) {
        form.classList.remove('none');
    }
};

function hideProfile () {
    const profile = document.getElementById('profile-card');
    const greeting =  profile.querySelector('.h5');
    const form = document.getElementById('order-form');

    if ( !form.classList.contains('none') ) {
        form.classList.add('none');
    }
    profile.classList.add('none');
    greeting.removeChild(greeting.childNodes[1]);   
};


function handleLogin(e) {
    e.preventDefault()

    document.getElementById('loader').classList.remove('none');

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const authCheckbox = document.getElementById('login-session');

    let sessionMode = (authCheckbox.checked) ? 'local' : 'session';

    userbase.signIn({ username, password, rememberMe: sessionMode })
      .then((user) => showProfile(user))
      .catch((e) => {document.getElementById('login-error').innerHTML = e;
                    document.getElementById('loader').classList.add('none')})
      
};

function handleRegister(e) {
    e.preventDefault();  
 
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
    const email = document.getElementById('signup-email').value;
    const usersName = document.getElementById('signup-first-name').value;


    
    document.getElementById('loader').classList.remove('none');

    userbase.signUp({ username, password, email, profile: {firstName : usersName}})
        .then((user) => showProfile(user))
        .catch((e) => {document.getElementById('signup-error').innerHTML = e;
                        document.getElementById('loader').classList.add('none')})
    
  
};

function handleSignOut(e) {
    e.preventDefault()

    userbase.signOut()
        .then(() => hideProfile())
        .then(() => showAuth())
        .catch((e) => document.getElementById('logout-error').innerText = e)
};



function orderBtn (e, orderNum) {
    e.preventDefault();

    

    checkAddress(user);
    getOrderData(orderNum);
    createOrder();
    sendOrder();

    
    
    
      
    
    


    

  


    //Get your unpaid cart
    //..
    //...
};

function getOrderData (orderNum) {
    const cart = document.querySelector('.cart-wrapper');
    const cartItems = cart.querySelectorAll('.cart-item');

    const dates = new function() {
        this.orderDate = Date.now();
        this.deliverDate = this.orderDate + 1 * 60 * 60 * 1000;
    };
    
    c
    

    let orderItems = {};

    for (let i = 0; i < cartItems.length; i++) {
        let food = new function() {
            this
        }
        let counter = this.querySelector('[data-counter]').innerText;
        let positionId = this.dataset.id;
        let dataPair = {
            positionId :  counter};
            let newItems = Object.assign(items, dataPair);

    }

    return Object.assign(orderArray, items);
};


// function openUsersDatabase (user) {
//     userbase.openDatabase({
//         databaseName: `${user.usename} orders`,
//         changeHandler: function (items) {
//             // update your application state with the database items
//         }
//     }).catch((e) => document.getElementById('db-error').innerText = e)
    
// };

// function changeHandler(items) {



// };

function checkAddress(user) {

    let orderAddress = document.getElementById('address').value;

    if (orderAddress != user.profile.primaryAddress) {
        let saveAddress = confirm('Хотите сохранить этот адрес?');
        if (saveAddress) {
            updateUserAddress(user, orderAddress);
        } 
    }

};

function updateUserAddress (user, orderAddress) {
    userbase.updateUser({
        profile: { primaryAddress : `${orderAddress}`}
      }).then(() => {
        // user account updated
      }).catch((e) => console.error(e))
}
