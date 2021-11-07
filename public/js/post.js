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
const commentPostSubmit = document.getElementById('commentPostSubmit');

// Update Comment Elements
const postUpdate = document.getElementById('postUpdate');
const updateCommentModal = document.getElementById('updateCommentModal');
const updateCommentModalSubmit = document.getElementById('updateCommentModal');
const commentformInputContent = document.getElementById('commentformInputContent');

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
      document.location.reload();
    } else {
      let formResult = document.getElementById('formResult');
      formResult.innerHTML = response.status;
    }
});

// // Post Comment Button Handler
// commentModal.addEventListener('shown.bs.modal', (event) => {
//   event.stopPropagation();
//   // Set Modal Comment button to submit to the active blog
//   const blog_id = event.relatedTarget.getAttribute('data-blog-id');
//   commentPostBtn.setAttribute('data-blog-id', blog_id);
//   commentPostSubmit.setAttribute('data-blog-id', blog_id);
  
//   // Create Comment Modal Listener
//   commentPostSubmit && commentPostSubmit.addEventListener('click', async (event) => {
//     event.preventDefault();
//     if (event.target === null) return;
    
//     if (event.target.id === 'commentPostSubmit') {
//       let content = commentformInputContent.value;
//       await commentOnPost(blog_id, content);
//     }
//   });
// });

function handleModalPopup (modalType) {
  if (modalType === null) return;

  // Verify Modal Target
  let modalId = modalType.getAttribute('data-bs-target').substring(1);
  const supportedModals = ['commentModal', 'updateCommentModal', 'updatePostModal'];
  if (!supportedModals.includes(modalId)) return;

  // Get Blog or Comment ID to set modal submit targets
  const blog_id = modalType.getAttribute('data-blog-id');
  const comment_id = modalType.getAttribute('data-comment-id');

  let modal = new bootstrap.Modal(document.getElementById(modalId));

  modal.show()
}

function handleModalOpen (target) {
  if (target === null) return;
  let blog_id = target.getAttribute('data-blog-id');
  let comment_id = target.getAttribute('data-comment-id');
  console.log(blog_id)
  console.log(comment_id)

  switch (target.id) {
    case 'postDelete':
      deletePost(blog_id);
      break;

    case 'commentDelete':
      deleteComment(comment_id);
      break;
    
    case 'postUpdate':
      updatePost(blog_id);
      break;
    
    case 'commentUpdate':
      updateComment(comment_id);
      break;

    default:
      console.log(`Unhandled Target: ${target}`);
      return false;
  }
};

// Create Blog Post Listener
postContainer[0] && postContainer[0].addEventListener('click', (event) => {
  if (event.target.type !== 'button') return;
  event.preventDefault();
  event.stopPropagation();
  console.log(event)
  handleModalPopup(event.target);  
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
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.reload();
  } 
};

// Delete Comment by Id
async function deleteComment(comment_id) {
  if (comment_id == null) return;

  const response = await fetch(`/api/blogs/comments/${comment_id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.reload();
  } 
};

// Update Blog by Id
async function updatePost(blog_id) {
  if (blog_id == null) return;

  let title = formPostTitle.value;
  let content = formPostTitle.value;

  const response = await fetch(`/api/blogs/${blog_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title,
      content,
      blog_id
    })
  });

  if (response.ok) {
    document.location.reload();
  }
}

// Update Blog by Id
async function updateComment(comment_id) {
  if (comment_id == null) return;

  let title = formPostTitle.value;
  let content = formPostTitle.value;

  const response = await fetch(`/api/blogs/${comment_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title,
      content,
      comment_id
    })
  });

  if (response.ok) {
    document.location.reload();
  }
}
