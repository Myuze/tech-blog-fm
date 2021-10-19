// Login Modal
// Login Elements
const ddLoginBtn = document.getElementById('ddLoginBtn');
const ddLogoutBtn = document.getElementById('ddLogoutBtn');
const homeLoginBtn = document.getElementById('homeLoginBtn');
const loginEmail = document.getElementById('loginEmail');
const inputPass = document.getElementById('inputPass');

// Modal Elements
// const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
const loginModal = document.getElementById('loginModal');
const loginSubmit = document.getElementById('loginSubmit');
const modalResult = document.getElementById('modalResult');

// Modal Login Submit Handler
loginModal && loginModal.addEventListener('click', async (event) => {
  if (event.target.getAttribute('type') != 'submit') return;
  event.preventDefault();
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
    document.location.replace('/');
  } else {
    modalResult.value = 'Incorrect Password or User does not exist';
  }
});

// Dropdown Logout Handler
ddLogoutBtn && ddLogoutBtn.addEventListener('click', async (event) => {
  event.preventDefault();

  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/');
  }
});
