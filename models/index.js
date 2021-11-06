const Blog = require('./Blog');
const User = require('./User');
const Comment = require('./Comment');

User.hasMany(Blog, {
  foreignKey: 'author_id',
});

Blog.belongsTo(User, {
  as: 'Blogger',
  foreignKey: 'author_id',
  onDelete: 'SET NULL'
});

User.hasMany(Comment, {
  foreignKey: 'author_id',
});

Comment.belongsTo(User, {
  as: 'Commenter',
  foreignKey: 'author_id',
  onDelete: 'SET NULL'
});

Blog.hasMany(Comment, {
  foreignKey: 'blog_id',
  onDelete: 'SET NULL'
});

Comment.belongsTo(Blog, {
  as: 'comments',
  foreignKey: 'blog_id',
  onDelete: 'SET NULL'
});

module.exports = { User, Blog, Comment };
