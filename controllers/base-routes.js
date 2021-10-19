const router = require('express').Router();
const { Blog } = require('../models');

const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    res.status(200).render('welcome');
  } catch (err) {
    console.log(err);
    res.status(500).render('404');
  }
});

router.get('/blog', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findAll();

    console.log(blogData)

    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    res.status(200).render('home', { blogs });
  } catch (err) {
    console.log(err)
    res.status(500).render('404');
  }
});

router.get('/login', async (req, res) => {

});

module.exports = router;
