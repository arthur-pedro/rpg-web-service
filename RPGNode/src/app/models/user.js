module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      code: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      level: DataTypes.INTEGER,
      xp: DataTypes.INTEGER,
      score: DataTypes.INTEGER,
      manager: DataTypes.BOOLEAN,
      active: DataTypes.BOOLEAN,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    });

    return User;
}