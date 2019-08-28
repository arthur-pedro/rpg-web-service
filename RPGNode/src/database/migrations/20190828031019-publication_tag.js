module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Publication_Tag', {
      publicationId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: { model: 'Tag', key: 'id' },
        onDelete: 'CASCADE'
      },
      tagId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: { model: 'Publication', key: 'id' },
        onDelete: 'CASCADE'
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
    return queryInterface.dropTable('Tag');
  }
};