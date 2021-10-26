// Home page scripts
// Menu Dropdown
const dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
const dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
  return new bootstrap.Dropdown(dropdownToggleEl);
});

// Card Click Handlers
const postContainer = document.querySelector('.post-container');
const cards = document.querySelectorAll('.card-body');

postContainer && postContainer.addEventListener('click', (event) => {
  event.preventdefault();
  if (event.target != 'postComment' || 'postDelete') return;

  
});
