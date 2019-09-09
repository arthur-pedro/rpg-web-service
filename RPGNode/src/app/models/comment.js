module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true
      },
      creatorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      body: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    });
    
    Comment.associate = (models) => {
      Comment.belongsTo(models.Publication, {
        as: 'publication',
        foreignkey:  'publicationId', 
        targetKey: 'id',
      });     

      Comment.belongsTo(models.User, { 
        as: 'creator',
        foreignkey:  'creatorId', 
        targetKey: 'id',
      });
    };

    return Comment;
}