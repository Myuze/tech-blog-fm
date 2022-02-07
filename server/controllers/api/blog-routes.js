const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');

const { apiAuth } = require('../../utils/auth');

// Get all Blog Posts
router.get('/', async (req, res) => {
  try {
    const dbBlogData = await Blog.findAll({
      include: {
        model: User,
        as: 'Blogger',
        attributes: ['id', 'username', 'email'],
      },
    });

    res.status(200).json(dbBlogData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Internal Server Error.',
      error: err,
    });
  }
});

// Create Blog Posts
router.post('/post', apiAuth, async (req, res) => {
  try {
    const { user_id } = req.session;

    const newPost = await Blog.create({
      title: req.body.title,
      content: req.body.content,
      author_id: user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json({
      message: 'Internal Server Error',
      error: err,
    });
  }
});

// Get Blog post by id
router.get('/:id', async (req, res) => {
  try {
    const dbBlogPost = await Blog.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: User,
        as: 'Blogger',
        attributes: ['id', 'username', 'email'],
      },
    });

    res.status(200).json(dbBlogPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Internal Server Error',
      error: err,
    });
  }
});

// Update Blog
router.put('/:id', apiAuth, async (req, res) => {
  try {
    const blog = await Blog.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!blog[0]) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blog);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Internal Server Error',
      error: err,
    });
  }
});

// Delete Blog
router.delete('/:id', apiAuth, async (req, res) => {
  try {
    const blog = await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!blog) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blog);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get Comments
router.get('/comments', apiAuth, async (req, res) => {
  try {
    const comment = await Comment.findAll({
      include: {
        model: User,
        as: 'Commenter',
        attributes: ['id', 'username', 'email'],
      },
    });

    res.status(200).json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Internal Server Error.',
      error: err,
    });
  }
});

// Post Comments to Blog Post
router.post('/comment', apiAuth, async (req, res) => {
  const { user_id } = req.session;
  try {
    const commentData = await Comment.create({
      content: req.body.content,
      blog_id: req.body.blog_id,
      author_id: user_id,
    });

    res.status(200).json(commentData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Internal Server Error',
      error: err,
    });
  }
});

// Get Comment by id
router.get('/comment/:id', apiAuth, async (req, res) => {
  try {
    const comment = await Comment.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: User,
        as: 'Commenter',
        attributes: ['id', 'username', 'email'],
      },
    });

    res.status(200).json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Internal Server Error',
      error: err,
    });
  }
});

// Update Comment
router.put('/comment/:id', apiAuth, async (req, res) => {
  try {
    const comment = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!comment[0]) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Internal Server Error',
      error: err,
    });
  }
});

// Delete Comment
router.delete('/comments/:id', apiAuth, async (req, res) => {
  try {
    const comment = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!comment) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
