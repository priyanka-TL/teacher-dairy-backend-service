"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("posts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      organization_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content_type: {
        type: Sequelize.ENUM("text", "voice"),
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      scope_type: {
        type: Sequelize.ENUM("class", "parent", "all"),
        allowNull: false,
      },
      scope_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      creator_by: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      updated_by: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    await queryInterface.addIndex("posts", ["organization_id"]);
    await queryInterface.addIndex("posts", ["creator_by"]);
    await queryInterface.addIndex("posts", ["scope_type", "scope_id"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("posts");
  },
};
