// Home page scripts
// Menu Dropdown
const dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
const dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
  return new bootstrap.Dropdown(dropdownToggleEl);
});

// Blog Posts
const homeNewPostBtn = document.getElementById('homeNewPostBtn');

homeNewPostBtn && homeNewPostBtn.addEventListener('click', (event) => {
  event.preventDefault();
  
});
