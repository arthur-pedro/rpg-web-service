module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('Event', {
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
      code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      local: {
        type: DataTypes.STRING
      },
      expired: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      expireAt: DataTypes.DATE, 
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    });

    return Event;
}