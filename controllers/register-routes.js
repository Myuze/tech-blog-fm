const router = require('express').Router();
const { User } = require('../models');

router.get('/', async (req, res) => {
  try {
    res.status(200).render('register');
  } catch (err) {
    console.log(err)
    res.status(500).render('error', { code: 500 });
  }
});

router.post('/', async ({ body }, res) => {
  try {
    const userInfo = await User.create(body);

    const user = userInfo.map()

    res.status(200).render('register-confirm', { user });
  } catch (err) {
    console.log(err);
    res.status(500).render('error', { code: 500 });
  }
});

module.exports = router;
