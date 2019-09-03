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
      startDate: {
        type: DataTypes.DATE, 
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE, 
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    });

    Event.associate = (models) => {
      Event.belongsToMany(models.Tag, {
        through: 'event_tag',
        as: 'tags',
        foreignkey:  'eventId'
      });     

      Event.belongsTo(models.User, { 
        as: 'creator',
        foreignkey:  'creatorId', 
        targetKey: 'id',
      });
    };

    return Event;
}