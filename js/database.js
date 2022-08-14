function database() {
    userbase.init({ appId: '3f437452-5213-4dbe-9500-45cef6c70c21' })
        .then((session) => session.user ? showProfile(session.user) : showAuth())
        .catch(() => showAuth())
        .finally(() => document.getElementById('loader').classList.add('none'))
};
   

function showProfile (user) {
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



// function sendOrder ()