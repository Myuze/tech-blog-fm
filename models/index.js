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
