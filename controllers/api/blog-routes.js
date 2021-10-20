const router = require('express').Router();
const { Blog, User } = require('../../models');

const { apiAuth } = require('../../utils/auth');

router.get('/', apiAuth, async (req, res) => {
	console.log(req.session)
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

router.post('/post', apiAuth, async (req, res) => {
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
router.get('/:id', apiAuth, async (req, res) => {
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
router.post('/:id', apiAuth, async (req, res) => {
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
