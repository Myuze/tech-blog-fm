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

  console.log(response)
  
  if (response.ok) {
    document.location.replace('/');
  } else {
    let modalResult = document.getElementById('modalResult');
    modalResult.value = response.status;
    return;
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
