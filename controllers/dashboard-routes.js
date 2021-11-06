const router = require('express').Router();
const { Blog, Comment, User } = require('../models');
const { withAuth } = require('../utils/auth');
const { Op } = require('sequelize');

router.get('/', withAuth, async (req, res) => {
  try {
    const { loggedIn, user_id, username } = req.session;
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          as: 'Blogger',
          attributes: ['username']
        },
        {
          model: Comment,
          attributes: ['author_id', 'content']
        }
      ]
    });

    // const commentData = await Comment.findAll({
    //   include: {      
    //     model: User,
    //     as: 'Commenter',
    //     attributes: ['username']
    //   }
    // });

    const blogs = blogData
      // .filter(blog => {
      //   blog.author_id === user_id
      //   )
      .map((blog) => blog.get({ plain: true }));

    console.log(blogs[0])
    console.log(blogs[1])
    // console.log(blogs[0].comments[0])
    

    // const comments = commentData.map((comment) => comment.get({ plain: true }));

    res.status(200).render('dashboard', { blogs, loggedIn, username, user_id });
  } catch (err) {
    console.log(err)
    res.status(500).render('error', { code: 500 });
  }
});

module.exports = router;
