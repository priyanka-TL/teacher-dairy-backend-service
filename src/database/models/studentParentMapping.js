"use strict";

module.exports = (sequelize, DataTypes) => {
  const StudentParentMapping = sequelize.define(
    "StudentParentMapping",
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
      },
      parent_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      relationship: {
        type: DataTypes.ENUM("Father", "Mother", "Guardian"),
        allowNull: false,
      },
      organization_id: {
        type: DataTypes.STRING,
        allowNull: false,
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
      modelName: "StudentParentMapping",
      tableName: "student_parent_mapping",
      freezeTableName: true,
      paranoid: true,
    }
  );

  return StudentParentMapping;
};
