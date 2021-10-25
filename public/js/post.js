// Blog Handlers
// Modal Post Form Elements
const formUserPost = document.getElementById('formUserPost');
const formPostTitle = document.getElementById('formPostTitle');
const formInputContent = document.getElementById('formInputContent');

// Modal Button Elements
const homeNewPostBtn = document.getElementById('homeNewPostBtn');
const modalPostSubmit = document.getElementById('modalPostSubmit');
const postSubmit = document.getElementById('postSubmit');

// Post Submit Handler
(postSubmit && postSubmit || modalPostSubmit && modalPostSubmit || homeNewPostBtn && homeNewPostBtn)
  .addEventListener('click', async (event) => {
    event.preventDefault();
    if (event.target.getAttribute('type') != 'submit') return;

    formPostTitle.focus();
    let user = formUserPost.value;
    let title = formPostTitle.value;
    let content = formInputContent.value;

    const response = await fetch('/api/blogs/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user,
        title,
        content
      })
    });

    if (response.ok) {
      console.log(response)
      document.location.replace('/');
    } else {
      let formResult = document.getElementById('formResult');
      formResult.value = response.status;
    }
});
