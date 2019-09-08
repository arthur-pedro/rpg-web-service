module.exports = (sequelize, DataTypes) => {
    const Campus = sequelize.define('Campus', {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      local: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    });

    Campus.associate = (models) => {
        Campus.hasMany(models.Extension_Program, { 
            as: 'extensionProjects',
            foreignkey:  'extensionProjectId', 
            targetKey: 'id',
        });
    };

    return Campus;
}