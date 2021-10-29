const router = require('express').Router();
const { Blog, User } = require('../models');
const { withAuth } = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const { loggedIn, username, user_id } = req.session;
    const blogData = await Blog.findAll({ 
      include: { 
        model: User,
        as: 'Blogger',
        attributes: ['username']
      }
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.status(200).render('welcome', { blogs, loggedIn, username, user_id });
  } catch (err) {
    console.log(err)
    res.status(500).render('error', { code: 500 });
  }
});

router.post('/post', withAuth, async (req, res) => {
  try {
    const { loggedIn, username } = req.session;
    const postData = await Blog.create({

    })
  } catch (err) {
    console.log(err);
    res.status(500).render('error', { code: 500 });
  }
});

module.exports = router;
