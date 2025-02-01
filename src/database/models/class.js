"use strict";
module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define(
    "Class",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
        allowNull: false,
        defaultValue: "ACTIVE",
      },
      organization_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      created_by: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      updated_by: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Class",
      tableName: "classes",
      freezeTableName: true,
      paranoid: true,
    }
  );

  return Class;
};
