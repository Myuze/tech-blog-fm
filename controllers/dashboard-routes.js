const router = require('express').Router();
const { Blog, User } = require('../models');
const { withAuth } = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const { loggedIn, user_id, username } = req.session;
    const blogData = await Blog.findAll({ 
      include: { 
        model: User,
        as: 'Blogger',
        attributes: ['username']
      }
    });

    const blogs = blogData
      .filter(blog => blog.author_id === user_id)
      .map((blog) => blog.get({ plain: true }));

    res.status(200).render('dashboard', { blogs, loggedIn, username });
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
