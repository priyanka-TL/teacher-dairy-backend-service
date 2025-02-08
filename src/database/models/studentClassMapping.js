"use strict";

module.exports = (sequelize, DataTypes) => {
  const StudentClassMapping = sequelize.define(
    "StudentClassMapping",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      student_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      class_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
      modelName: "StudentClassMapping",
      tableName: "student_class_mapping",
      freezeTableName: true,
      paranoid: true,
    }
  );

  return StudentClassMapping;
};
