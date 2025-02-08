"use strict";

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      organization_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content_type: {
        type: DataTypes.ENUM("text", "voice"),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      scope_type: {
        type: DataTypes.ENUM("class", "parent", "all"),
        allowNull: false,
      },
      scope_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      creator_by: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      updated_by: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated_at: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Post",
      tableName: "posts",
      freezeTableName: true,
      paranoid: true,
    }
  );

  return Post;
};
