// Registration
// Elements
const registerUsername = document.getElementById('registerUsername');
const registerEmail = document.getElementById('registerEmail');
const registerPass = document.getElementById('registerPass');
const registerPassConfirm = document.getElementById('registerPassConfirm');
const confirmResult = document.getElementById('confirmResult');

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

  if (!password === passwordConfirm) {
    confirmResult.placeholder = "Your passwords do not match"
    return;
  }

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
    confirmResult.value = response.status;
    return;
  }
});
