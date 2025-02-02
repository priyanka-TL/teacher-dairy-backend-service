"use strict";

module.exports = (sequelize, DataTypes) => {
  const ClassTeacherMapping = sequelize.define(
    "ClassTeacherMapping",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      class_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      teacher_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      organization_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "ClassTeacherMapping",
      tableName: "class_teacher_mapping",
      freezeTableName: true,
      paranoid: true,
    }
  );

  // ClassTeacherMapping.associate = (models) => {
  //   ClassTeacherMapping.belongsTo(models.Class, {
  //     foreignKey: "class_id",
  //     as: "class",
  //   });
  // };

  return ClassTeacherMapping;
};
