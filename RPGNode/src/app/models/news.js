module.exports = (sequelize, DataTypes) => {
    const News = sequelize.define('News', {
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
      creatorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      expired: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      expireAt: DataTypes.DATE, 
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    });

    return News;
}