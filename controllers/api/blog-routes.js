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
		res.status(400).json({ message: "Internal Server Error." });
	}
});