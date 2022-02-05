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

  } else if (password.length < 8) {
    registerResult.classList.add('error');
    registerResult.innerHTML = 'Your password must be at least 8 characters.';
    return;
      
  } else if (username === null || username == '' || email == '' || email == null) {
    registerResult.classList.add('error');
    registerResult.innerHTML = "Username or Email cannot be empty";
    return;
    
  } else if (username.length < 4) {
    registerResult.classList.add('error');
    registerResult.innerHTML = "Username must be at least 4 characters.";
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
      const { errors } = await response.json()
      let errorMessage;
      console.log('ERROR', errors[0])
      
      switch (errors[0].validatorKey) {
        case 'not_unique':
          errorMessage = 'Username or Email already exists.'
          break;
        case 'isEmail':
          errorMessage = 'You must use a valid Email address.'
          break;
        default:
          console.log(`Unhandled message: ${errors[0].message}`);
          errorMessage = errors[0].message;
          break;
      }

      registerResult.classList.add('error');
      registerResult.innerHTML = errorMessage;
      return;
    }
  }
});
