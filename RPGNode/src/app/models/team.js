module.exports = (sequelize, DataTypes) => {
    const Team = sequelize.define('Team', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true
      },
      name: {
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
      expired: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      }, 
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    });

    Team.associate = (models) => {
      Team.belongsToMany(models.Tag, {
        through: 'team_tag',
        as: 'tags',
        foreignkey:  'teamId'
      });     

      Team.belongsTo(models.User, { 
        as: 'creator',
        foreignkey:  'creatorId', 
        targetKey: 'id',
      });
    };

    return Team;
}