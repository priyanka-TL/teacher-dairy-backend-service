"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("class_teacher_mapping", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      class_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      teacher_id: {
        type: Sequelize.STRING,
        allowNull: false,
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

    await queryInterface.addIndex("class_teacher_mapping", ["class_id"]);
    await queryInterface.addIndex(
      "class_teacher_mapping",
      ["class_id", "teacher_id"],
      {
        unique: true,
        name: "unique_class_teacher",
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("class_teacher_mapping");
  },
};
