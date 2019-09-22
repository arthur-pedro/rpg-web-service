module.exports = (sequelize, DataTypes) => {
    const Publication = sequelize.define('Publication', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      isPublic: DataTypes.BOOLEAN,
      likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      creatorId: {
        type: DataTypes.INTEGER,
      },
      extensionId: {
        type: DataTypes.INTEGER,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    });

    Publication.associate = (models) => {
      Publication.belongsToMany(models.Tag, {
          through: 'publication_tag',
          as: 'tags',
          foreignkey:  'publicationId'
      });

      Publication.belongsTo(models.User, { 
        as: 'creator',
        foreignkey:  'creatorId', 
        targetKey: 'id',
      });

      Publication.hasMany(models.Comment, {
        as: "comments",
        sourceKey: 'id',
        foreignKey: 'publicationId',
      });
    };

    return Publication;
}