const router = require('express').Router();
const { Blog, Comment, User } = require('../models');
const { withAuth } = require('../utils/auth');
const { Op } = require('sequelize');

router.get('/', withAuth, async (req, res) => {
  try {
    const { loggedIn, user_id, username } = req.session;

    // Get all Comments
    const commentData = await Comment.findAll({
      include: {      
        model: User,
        as: 'Commenter',
        attributes: ['username']
      }
    });

    // Filter all active user's comments on blogs
    const userComments = commentData
      .filter(comment => comment.author_id === user_id)
      .map((comment) => comment.get({ plain: true }));

    // Store all blog_id of Blogs commented by user in array for query
    let blogArray = [];
    for (let i = 0; i < userComments.length; i++) {
      blogArray.push(userComments[i].blog_id);
    }

    // Query all User's blogs and blogs user commented on
    const userBlogData = await Blog.findAll({
      where: {
        [Op.or]: [
          { author_id: user_id },
          { id: {
              [Op.or]: blogArray
            }
          }
        ]
      },
      include: { 
        model: User,
        as: 'Blogger',
        attributes: ['username']
      }
    });
    
    const blogs = userBlogData
      .map((comment) => comment.get({ plain: true }));

    // // Add all user commented blogs to list of Blogs
    // let blogs = userBlogs.concat(userCommentedBlogs)

    console.log('blogs', blogs)
    let comments = userComments;

    res.status(200).render('dashboard', { blogs, comments, loggedIn, username, user_id });
  } catch (err) {
    console.log(err)
    res.status(500).render('error', { code: 500 });
  }
});

module.exports = router;
