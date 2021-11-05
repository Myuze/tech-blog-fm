// Registration
// Elements
const registerUsername = document.getElementById('registerUsername');
const registerEmail = document.getElementById('registerEmail');
const registerPass = document.getElementById('registerPass');
const registerPassConfirm = document.getElementById('registerPassConfirm');
const confirmResult = document.getElementById('confirmResult');
const registerResult = document.getElementById('registerResult');

// Buttons
const registerSubmit = document.getElementById('registerSubmit');

registerSubmit && registerSubmit.addEventListener('click', async (event) => {
  event.preventDefault();
  if (event.target.getAttribute('type') != 'submit') return;
  registerUsername.focus();
  
  let username = registerUsername.value;
  let email = registerEmail.value;
  let password = registerPass.value;
  let passwordConfirm = registerPassConfirm.value;

  if (!(password === passwordConfirm)) {
    registerResult.classList.add('error');
    registerResult.innerHTML = 'Your passwords do not match, please try again.';
    return;

  } else if (password == "" || password == null) {
    registerResult.classList.add('error');
    registerResult.innerHTML = 'Your password cannot be blank, please try again.';
    return;
    
  } else if (username === null || username == '' || email == '' || email == null) {
    registerResult.classList.add('error');
    registerResult.innerHTML = "Username or Email cannot be empty";
    return;

  } else {
    const response = await fetch('/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password
      })
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      confirmResult.innerHTML = response.status;
      return;
    }
  }
});
