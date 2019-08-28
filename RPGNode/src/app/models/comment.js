module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
      user_id: DataTypes.STRING,
      description: DataTypes.STRING,
    });
    return Comment;
}