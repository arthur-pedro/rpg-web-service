module.exports = (sequelize, DataTypes) => {
    const Expertise = sequelize.define('Expertise', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    });

    Expertise.associate = (models) => {
      Expertise.hasMany(models.Extension_Program, {
            as: "extensionProjects",
            sourceKey: 'id',
            foreignKey: 'expertiseId',
        });
    };

    return Expertise;
}