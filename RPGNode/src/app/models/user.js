module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      level: DataTypes.INTEGER,
      xp: DataTypes.INTEGER,
      score: DataTypes.INTEGER,
      photo: DataTypes.STRING,
      manager: DataTypes.BOOLEAN,
      active: DataTypes.BOOLEAN,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    });
    
    User.associate = (models) => {
      User.hasMany(models.Task, {
        as: "createdTasks",
        sourceKey: 'id',
        foreignKey: 'creatorId',
      });

      User.hasMany(models.Comment, {
        as: "comments",
        sourceKey: 'id',
        foreignKey: 'creatorId',
      });

      User.hasMany(models.Extension_Program, {
        as: "createdExtensions",
        sourceKey: 'id',
        foreignKey: 'creatorId',
      });

      User.hasMany(models.Publication, {
        as: "createdPublications",
        sourceKey: 'id',
        foreignKey: 'creatorId',
      });
    };

    return User;
}