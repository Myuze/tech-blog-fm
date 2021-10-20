const Blog = require('./Blog');
const User = require('./User');
const Comment = require('./Comment');

User.hasMany(Blog, {
  foreignKey: 'author_id',
  onDelete: 'SET NULL'
});

Blog.belongsTo(User, {
  foreignKey: 'author_id'
});

User.hasMany(Comment, {
  foreignKey: 'author_id',
  onDelete: 'SET NULL'
});

Comment.belongsTo(User, {
  foreignKey: 'author_id'
});

Blog.hasMany(Comment, {
  foreignKey: {
    model: 'blog',
    key: 'id'
  }
});

Comment.belongsTo(Blog, {
  foreignKey: {
    model: 'comment',
    key: 'id'
  }
});

module.exports = { User, Blog, Comment };
