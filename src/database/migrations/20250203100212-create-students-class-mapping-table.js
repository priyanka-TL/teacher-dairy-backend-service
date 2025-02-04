"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("student_class_mapping", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      student_id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      class_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      organization_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      updated_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addIndex("student_class_mapping", ["student_id"]);
    await queryInterface.addIndex("student_class_mapping", ["class_id"]);
    await queryInterface.addIndex(
      "student_class_mapping",
      ["student_id", "class_id", "organization_id"],
      {
        unique: true,
        name: "unique_user_class",
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("student_class_mapping");
  },
};
