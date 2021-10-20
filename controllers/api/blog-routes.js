const router = require('express').Router();
const { Blog, User } = require('../../models');

const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
	try {
		const dbBlogData = await Blog.findAll({
			include: {
				model: User,
				attributes: ['id', 'username']
			}
		});

		res.status(200).json(dbBlogData);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Internal Server Error.',
			error: err
		});
	}
});

router.post('/post', withAuth, async (req, res) => {
	try {
		const newPost = await Blog.create({
			title: req.body.title,
			content: req.body.content,
			user_id: req.body.user_id
		});
		
		res.status(200).json(newPost);
	} catch (err) {
		res.status(500).json({
			message: 'Internal Server Error',
			error: err
		});
	}
});

// Get Blog post by id
router.get('/:id', withAuth, async (req, res) => {
	try {
		const dbBlogPost = await Blog.findOne({
			where: {
				id: req.params.id
			},
			include: {
				model: Comment,
				model: User
			}
		});

    res.status(200).json(dbBlogPost);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Internal Server Error',
			error: err
		});
	}
});

// Post Comments to Blog Post
router.post('/:id', withAuth, async (req, res) => {
  try {
      const commentData = await Comment.create({
        content: req.body.content,
        blog_id: req.body.blog_id,
        author_id: req.session.user_id,
      });
      res.status(200).json(commentData);
    
  } catch (err) {
    console.log(err);
		res.status(400).json({
			message: 'Internal Server Error',
			error: err
		});
  }
});

module.exports = router;
