const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    res.status(200).render('register');
  } catch (err) {
    console.log(err)
    res.status(500).render('error', { code: 500 });
  }
});

module.exports = router;
