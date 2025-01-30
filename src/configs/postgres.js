require("dotenv").config();
const path = require("path");

module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    migrationStorageTableName: "sequelize_meta",
    define: {
      underscored: true,
      freezeTableName: true,
      paranoid: true,
      syncOnAssociation: true,
      charset: "utf8",
      collate: "utf8_general_ci",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    },
    defaultOrgId: parseInt(process.env.DEFAULT_ORG_ID),
    migrationStoragePath: path.join(__dirname, "../database/migrations"),
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: "postgres",
    defaultOrgId: parseInt(process.env.DEFAULT_ORG_ID),
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    defaultOrgId: parseInt(process.env.DEFAULT_ORG_ID),
  },
};
