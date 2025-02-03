"use strict";

module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define(
    "Student",
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
      roll_no: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      dob: {
        type: DataTypes.DATE,
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
      modelName: "Student",
      tableName: "students",
      freezeTableName: true,
      paranoid: true,
    }
  );

  return Student;
};
