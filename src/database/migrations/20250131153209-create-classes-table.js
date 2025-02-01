"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("classes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
        allowNull: false,
        defaultValue: "ACTIVE",
      },
      organization_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      created_by: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      updated_by: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addIndex("classes", ["name"], {
      name: "name_index",
    });

    await queryInterface.addIndex("classes", ["name", "organization_id"], {
      unique: true,
      name: "unique_name_org_id",
      where: {
        deleted_at: null,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("classes");
  },
};
