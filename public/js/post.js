// import bootstrap from "../../node_modules/bootstrap/";

// Blog Handlers
// Modal Post Form Elements
const formPostTitle = document.getElementById('formPostTitle');
const formInputContent = document.getElementById('formInputContent');

// Modal Button Elements
const homeNewPostBtn = document.getElementById('homeNewPostBtn');
const modalPostSubmit = document.getElementById('modalPostSubmit');
const postSubmit = document.getElementById('postSubmit');

// Post Elements
const postContainer = document.getElementsByClassName('post-container');

// Comment Elements
const commentModal = document.getElementById('commentModal');
const commentPostBtn = document.getElementById('postComment');
const commentInputContent = document.getElementById('commentInputContent');
const commentPostSubmit = document.getElementById('commentPostSubmit');

// Post Submit Handler
(postSubmit && postSubmit || modalPostSubmit && modalPostSubmit || homeNewPostBtn && homeNewPostBtn)
  .addEventListener('click', async (event) => {
    event.preventDefault();
    if (event.target.getAttribute('type') != 'submit') return;

    formPostTitle.focus();
    let title = formPostTitle.value;
    let content = formInputContent.value;

    const response = await fetch('/api/blogs/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content
      })
    });

    if (response.ok) {
      console.log(response)
      document.location.reload();
    } else {
      let formResult = document.getElementById('formResult');
      formResult.innerHTML = response.status;
    }
});

// Post Comment Button Handler
commentModal.addEventListener('shown.bs.modal', (event) => {
  // Set Modal Comment button to submit to the active blog
  const blog_id = event.relatedTarget.getAttribute('data-blog-id');
  commentPostBtn.setAttribute('data-blog-id', blog_id);
  commentPostSubmit.setAttribute('data-blog-id', blog_id);
  
  // Create Comment Modal Listener
  commentPostSubmit && commentPostSubmit.addEventListener('click', async (event) => {
    event.preventDefault();
    if (event.target === null) return;
    
    if (event.target.id === 'commentPostSubmit') {
      let content = commentInputContent.value;
      console.log('blog_id, content: ', blog_id, content);
      await commentOnPost(blog_id, content);
    }
  });
});

// Create Blog Post Listener
postContainer[0] && postContainer[0].addEventListener('click', async (event) => {
  event.preventDefault();
  if (event.target === null) return;
  
  let blog_id = event.target.getAttribute('data-blog-id');

  if (event.target.id === 'postDelete') {
    await deletePost(blog_id);
  };
});

// Comment on Blog Post
async function commentOnPost(blog_id, content) {
  if (blog_id == null || content == '' || content == null) return;

  const response = await fetch('/api/blogs/comment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content,
      blog_id
    })
  });

  if (response.ok) {
    console.log(response)
    document.location.reload();
  } else {
    let formResult = document.getElementById('formResult');
    formResult.value = response.status;
  }
};

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
};

// Select button to focus based on target
function focusButton(target) {
  if (target.type != 'button') return;

  switch (target) {
    case target.toLower().contains('modal'):
      
      
      break;
  
    default:
      break;
  }
};
