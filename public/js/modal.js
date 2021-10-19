// Login Modal
var loginModal = document.getElementById('loginModal')
var loginEmail = document.getElementById('loginEmail')
var inputPass = document.getElementById('inputPass')

loginModal.addEventListener('shown.bs.modal', function () {
  loginEmail.focus()
});
