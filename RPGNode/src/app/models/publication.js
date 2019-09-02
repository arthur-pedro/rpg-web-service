module.exports = (sequelize, DataTypes) => {
    const Publication = sequelize.define('Publication', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      creatorId: {
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
    };

    return Publication;
}