// Blog Handlers
// Modal Post Form Elements
const formPostTitle = document.getElementById('formPostTitle');
const updateFormPostTitle = document.getElementById('updateFormPostTitle');
const formInputContent = document.getElementById('formInputContent');
const updateFormInputContent = document.getElementById('updateFormInputContent');

// Modal Button Elements
const homeNewPostBtn = document.getElementById('homeNewPostBtn');
const modalPostSubmit = document.getElementById('modalPostSubmit');
const postSubmit = document.getElementById('postSubmit');

// Post Elements
const postContainer = document.getElementsByClassName('post-container');
const dashFormInputContent = document.getElementById('dashFormInputContent');

// Comment Elements
const commentModal = document.getElementById('commentModal');
const commentPostBtn = document.getElementById('postComment');
const commentPostSubmit = document.getElementById('commentPostSubmit');

// Update Comment Elements
const updateCommentModal = document.getElementById('updateCommentModal');
const updateCommentModalSubmit = document.getElementById('updateCommentModal');
const commentformInputContent = document.getElementById('commentformInputContent');
const updateCommentFormInputContent = document.getElementById('updateCommentFormInputContent');

// Create Post Submit Listener
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

// Create Modal based on button clicked on a Blog post
function handleModalPopup (modalType) {
  if (modalType === null) return;

  // Verify Modal Target
  let modalId = modalType.getAttribute('data-bs-target');
  modalId = (modalId !== null && modalId.startsWith('#')) ? modalId.substring(1) : modalId;
  let modalEl = document.getElementById(modalId);
  const supportedModals = ['commentModal', 'updateCommentModal', 'updatePostModal'];
  if (!supportedModals.includes(modalId)) return;

  // Create modal instance
  let modal = new bootstrap.Modal(modalEl);
  modal.show()

  let id;
  if (modalType.hasAttribute('data-blog-id')) {
    id = modalType.getAttribute('data-blog-id')
  } else {
    id = modalType.getAttribute('data-comment-id')
  }
  
  modalEl.setAttribute('data-id', id);

  // Create Modal Event Listener
  modalEl && modalEl.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.type !== 'submit') return;

    let param = event.delegateTarget.getAttribute('data-id');
    handleModalSubmit(event.target, param);
  });
};

// Create Blog Post Listener
postContainer[0] && postContainer[0].addEventListener('click', (event) => {
  event.preventDefault();
  if (event.target.type !== 'button') return;

  handleModalPopup(event.target);
  handleButtonEvent(event.target);
});

function handleModalSubmit (target, param) {
  let body = {};

  if (target === null || target.type !== 'submit') return;

  switch (target.id) {
    case 'updatePostModalSubmit':
      body.blog_id = param;
      body.author_id = param;
      body.title = updateFormPostTitle.value;
      body.content = updateFormInputContent.value;

      updatePost(body);
      break;
    
    case 'updateCommentModalSubmit':
      body.comment_id = param;
      body.content = updateCommentformInputContent.value;
      console.log(body)
      updateComment(body);
      break;

    case 'commentPostSubmit':
      body.blog_id = param;
      body.content = commentformInputContent.value;
      commentOnPost(JSON.stringify(body));
      break;

    default:
      console.log(`Unhandled Target: ${target.id}`);
      return false;
  }
};

function handleButtonEvent(target) {
  let param;
  if (target.hasAttribute('data-blog-id')) {
    param = target.getAttribute('data-blog-id');
  } else if (target.hasAttribute('data-comment-id')) {
    param = target.getAttribute('data-comment-id');
  } else {
    console.log('Unhandled Blog or Comment ID');
  }

  switch (target.id) {
    case 'postDelete':
      deletePost(param);
      break;
    case 'commentDelete':
      deleteComment(param);
      break;
    
    case 'postComment':
      break;
    
    case 'updateComment':
      break;

    case 'updatePost':
      break;

    default:
      console.log('Unhandled Button', target.id, target.type)
      break;
  }
}

// Comment on Blog Post
async function commentOnPost(body) {
  if (body == null) return;

  const response = await fetch('/api/blogs/comment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body
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
async function updatePost(body) {
  if (body === null) return;
  
  const response = await fetch(`/api/blogs/${body.blog_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: body.title,
      content: body.content
    })
  });

  if (response.ok) {
    document.location.reload();
  }
}

// Update Blog Comment by Id
async function updateComment(body) {
  if (body.comment_id == null) return;

  const response = await fetch(`/api/blogs/comment/${body.comment_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      content: body.content
    })
  });

  if (response.ok) {
    // document.location.reload();
  }
}
