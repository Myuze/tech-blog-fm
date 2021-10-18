const Blog = require('./Blog');
const User = require('./User');

User.hasMany(Blog, {
    foreignKey: 'author_id',
    onDelete: 'SET NULL'
});

Blog.belongsTo(User, {
    foreignKey: 'author_id'
});

module.exports = { User, Blog };
