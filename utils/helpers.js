module.exports = {
    if_first: (index) => (index === 0) ? true : false,
    if_user: (author_id, user_id) => (author_id === user_id) ? true : false,
    if_commenter: (blog_id, comment_blog_id) => (blog_id === comment_blog_id) ? true : false,
    format_created: (date) => date.toLocaleDateString(),
    parse_err_code: (code) => {
      switch (code) {
        case (code >= 400):
          return 400;
        case (code >= 500):
          return 500;
        default:
          console.log('Unknown Error Code!');
          break;
      }
    }
  };
  