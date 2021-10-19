// Home page scripts
// Menu Dropdown
var dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
var dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
  return new bootstrap.Dropdown(dropdownToggleEl)
});

// Login
const ddLoginBtn = document.getElementById('ddLoginBtn');
const homeLoginBtn = document.getElementById('homeLoginBtn');
const inputPass = document.getElementById('inputPass');
const loginEmail = document.getElementById('loginEmail');

// Blog Posts
