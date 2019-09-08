module.exports = (sequelize, DataTypes) => {
    const ExtensionProgram = sequelize.define('Extension_Program', {
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
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    });

    ExtensionProgram.associate = (models) => {
      ExtensionProgram.belongsTo(models.User, { 
          as: 'creator',
          foreignkey:  'creatorId', 
          targetKey: 'id',
      });

      ExtensionProgram.belongsTo(models.Campus, { 
        as: 'campus',
        foreignkey:  'campusId', 
        targetKey: 'id',
      });

      ExtensionProgram.belongsTo(models.Expertise, { 
            as: 'expertise',
            foreignkey:  'expertiseId', 
            targetKey: 'id',
        });

      ExtensionProgram.belongsToMany(models.Tag, {
        through: 'extension_program_tag',
        as: 'tags',
        foreignkey:  'extensionProgramId'
      });  
    };

    return ExtensionProgram;
}