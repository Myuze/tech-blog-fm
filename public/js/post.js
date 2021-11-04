// Blog Handlers
// Modal Post Form Elements
const formUserPost = document.getElementById('formUserPost');
const formPostTitle = document.getElementById('formPostTitle');
const formInputContent = document.getElementById('formInputContent');

// Modal Button Elements
const homeNewPostBtn = document.getElementById('homeNewPostBtn');
const modalPostSubmit = document.getElementById('modalPostSubmit');
const postSubmit = document.getElementById('postSubmit');

// Post Elements
const postContainer = document.getElementsByClassName('post-container');
const postCommentBtn = document.getElementById('postcomment');
const postDeleteBtn = document.getElementById('postDelete');

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
      document.location.reload();
    } else {
      let formResult = document.getElementById('formResult');
      formResult.value = response.status;
    }
});

// postCommentBtn && postCommentBtn.addEventListener('click', async (event) => {
//   event.preventDefault();
//   if (event.target === null) return;
  
postContainer[0] && postContainer[0].addEventListener('click', async (event) => {
  event.preventDefault();
  if (event.target === null) return;

  if (event.target.id === 'postDelete') {
    let blog_id = event.target.getAttribute('data-blog-id');
    console.log('blog-id', blog_id)
    await deletePost(blog_id);
  };
});

// Delete Blog Post by Id
async function deletePost(blog_id) {
  if (blog_id == null) return;

  const response = await fetch(`/api/blogs/${blog_id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    console.log(response)
    document.location.reload();
  } 
}

// Select button to focus based on target
function focusButton(target) {
  if (target.type != 'button') return;

  switch (target) {
    case target.toLower().contains('modal'):
      
      
      break;
  
    default:
      break;
  }
}
