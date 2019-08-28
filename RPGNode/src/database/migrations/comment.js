module.exports = {
    up: (queryInterface, DataTypes) => {
      return queryInterface.createTable('Comment', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        user_id: {
          allowNull: false,
          type: DataTypes.INTEGER,
        },
        description: {
          allowNull: false,
          type: DataTypes.STRING,
          unique: true,
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
      });
    },
  
    down: (queryInterface) => {
      return queryInterface.dropTable('Comment');
    }
  };