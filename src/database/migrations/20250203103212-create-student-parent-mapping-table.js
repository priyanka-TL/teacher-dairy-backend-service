"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("student_parent_mapping", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      parent_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      relationship: {
        type: Sequelize.ENUM("Father", "Mother", "Guardian"),
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

    await queryInterface.addIndex("student_parent_mapping", ["student_id"]);
    await queryInterface.addIndex("student_parent_mapping", ["parent_id"]);

    // Adding the unique constraint for preventing duplicate mappings
    await queryInterface.addConstraint("student_parent_mapping", {
      fields: ["student_id", "parent_id"],
      type: "unique",
      name: "unique_student_parent_mapping",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("student_parent_mapping");
  },
};
