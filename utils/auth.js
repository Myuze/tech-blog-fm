const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.loggedIn) {
    console.log(req.headers)
    res.redirect('/login');
  } else {
    // We call next() if the user is authenticated
    next();
  }
};

const apiAuth = async (req, res, next) => {
  if (!req.session.loggedIn) {
    console.log(req)
    console.log(req.headers)
    // const response = await fetch('/api/user/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Basic ${base64.encode(`${req.params.email}:${req.params.password}`)}`
    //   },
    // });
  } else {
    next();
  }
};

module.exports = {
  withAuth,
  apiAuth
}
