module.exports = {
    if_first: (index) => (index === 0) ? true : false,
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
    },
    if_user: (blog, user_id) => {
      return (blog === user_id) ? `<button id="postDelete" class="btn btn-primary" type="button">Delete</button>` : false
    }
  };
  