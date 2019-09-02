module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
      userId: DataTypes.STRING,
      description: DataTypes.STRING,
    });
    return Comment;
}