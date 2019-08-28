module.exports = (sequelize, DataTypes) => {
    const Tag = sequelize.define('Tag', {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
    });

    Tag.associate = (models) => {
      Tag.belongsToMany(models.Publication, {
          through: 'publication_tag',
          as: 'publications',
          foreignkey:  'tagId'
      });
    };

    return Tag;
}