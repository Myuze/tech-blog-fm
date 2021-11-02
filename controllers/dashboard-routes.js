const router = require('express').Router();
const { Blog, Comment, User } = require('../models');
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

    const commentData = await Comment.findAll({
      include: {      
        model: User,
        as: 'Commenter',
        attributes: ['username']
      }
    });

    const blogs = blogData
      .filter(blog => blog.author_id === user_id)
      .map((blog) => blog.get({ plain: true }));

    const comments = commentData.map((comment) => comment.get({ plain: true }));

    res.status(200).render('dashboard', { blogs, comments, loggedIn, username, user_id });
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
