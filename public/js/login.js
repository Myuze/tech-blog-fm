// Login Modal
// Login Elements
const ddLoginBtn = document.getElementById('ddLoginBtn');
const ddLogoutBtn = document.getElementById('ddLogoutBtn');
const signUpBtn = document.getElementById('signUpBtn');
const homeLoginBtn = document.getElementById('homeLoginBtn');
const loginEmail = document.getElementById('loginEmail');
const inputPass = document.getElementById('inputPass');

// Modal Elements
const loginModal = document.getElementById('loginModal');
const loginSubmit = document.getElementById('loginSubmit');

// Modal Login Submit Handler
loginModal && loginModal.addEventListener('click', async (event) => {
  event.preventDefault();
  if (event.target.getAttribute('type') != 'submit') return;
  loginEmail.focus();
  let email = loginEmail.value;
  let password = inputPass.value;
  
  const response = await fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password
    })
  });
  
  if (response.ok) {
    document.location.reload();
  } else {
    let modalResult = document.getElementById('modalResult');
    modalResult.innerHTML = response.status;
    return;
  }
});

// Signup Button Handler
signUpBtn && signUpBtn.addEventListener('click', async (event) => {
  event.preventDefault();

  document.location.replace('/register');
});
