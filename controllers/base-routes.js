const router = require('express').Router();
const { Blog, User } = require('../models');

router.get('/', async (req, res) => {
  try {
    const { loggedIn } = req.session;
    const blogData = await Blog.findAll({ 
      include: { 
        model: User,
        attributes: ['username']
      }
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    console.log(blogs)
    res.status(200).render('welcome', { blogs, loggedIn });
  } catch (err) {
    console.log(err)
    res.status(500).render('404');
  }
});

module.exports = router;
