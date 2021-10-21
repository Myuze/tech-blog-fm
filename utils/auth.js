const { User } = require('../models');

const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    // We call next() if the user is authenticated
    next();
  }
};

const apiAuth = async (req, res, next) => {
  if (!req.session.loggedIn && req.headers.authorization) {
    // Parse login and password from headers
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');

    const dbUserData = await User.findOne({
      where: {
        email: login
      },
    });

    if (!dbUserData) {
      res.status(400).json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPass(password);
    console.log(validPassword)
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
    });
    
    next();
  } else {
    withAuth(req, res, next);
  }
};

module.exports = {
  withAuth,
  apiAuth
}
