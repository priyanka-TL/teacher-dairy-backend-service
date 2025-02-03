"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("students", {
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
      roll_no: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
      },
      dob: {
        type: Sequelize.DATE,
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

    await queryInterface.addIndex("students", ["user_id"]);
    await queryInterface.addIndex("students", ["class_id"]);
    await queryInterface.addIndex(
      "students",
      ["user_id", "class_id", "organization_id"],
      {
        unique: true,
        name: "unique_user_class",
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("students");
  },
};
