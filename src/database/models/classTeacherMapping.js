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
    },
    {
      sequelize,
      modelName: "ClassTeacherMapping",
      tableName: "class_teacher_mapping",
      freezeTableName: true,
      paranoid: true,
    }
  );

  return ClassTeacherMapping;
};
