"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("permissions", null, {});

    try {
      const permissionsData = [
        {
          code: "entity_type_permissions",
          module: "entity-types",
          request_type: ["POST", "DELETE", "GET", "PUT", "PATCH"],
          api_path: "/ptd/v1/entity-types/*",
          status: "ACTIVE",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          code: "read_entity_type_permissions",
          module: "entity-types",
          request_type: ["POST"],
          api_path: "/ptd/v1/entity-types/read",
          status: "ACTIVE",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          code: "entity_permissions",
          module: "entities",
          request_type: ["POST", "DELETE", "GET", "PUT", "PATCH"],
          api_path: "/ptd/v1/entities/*",
          status: "ACTIVE",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          code: "read_entity_permissions",
          module: "entities",
          request_type: ["POST"],
          api_path: "/ptd/v1/entities/read",
          status: "ACTIVE",
          created_at: new Date(),
          updated_at: new Date(),
        },

        {
          code: "list_teachers",
          module: "teachers",
          request_type: ["GET"],
          api_path: "/ptd/v1/teachers/list*",
          status: "ACTIVE",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          code: "list_students",
          module: "students",
          request_type: ["GET"],
          api_path: "/ptd/v1/students/list*",
          status: "ACTIVE",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          code: "list_parents",
          module: "parents",
          request_type: ["GET"],
          api_path: "/ptd/v1/parents/list*",
          status: "ACTIVE",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          code: "teacher_create_update",
          module: "teachers",
          request_type: ["POST", "DELETE", "GET", "PUT", "PATCH"],
          api_path: "/ptd/v1/teachers/update*",
          status: "ACTIVE",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          code: "student_create_update",
          module: "students",
          request_type: ["POST", "DELETE", "GET", "PUT", "PATCH"],
          api_path: "/ptd/v1/students/update*",
          status: "ACTIVE",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          code: "parent_create_update",
          module: "parents",
          request_type: ["POST", "DELETE", "GET", "PUT", "PATCH"],
          api_path: "/ptd/v1/parents/update*",
          status: "ACTIVE",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          code: "list_post",
          module: "posts",
          request_type: ["GET"],
          api_path: "/ptd/v1/posts/list/*",
          status: "ACTIVE",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          code: "posts_create_update",
          module: "posts",
          request_type: ["POST", "DELETE", "GET", "PUT", "PATCH"],
          api_path: "/ptd/v1/posts/update*",
          status: "ACTIVE",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          code: "comments_create_update",
          module: "comments",
          request_type: ["POST", "DELETE", "GET", "PUT", "PATCH"],
          api_path: "/ptd/v1/comments/update*",
          status: "ACTIVE",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];
      await queryInterface.bulkInsert("permissions", permissionsData);
    } catch (error) {
      console.log(error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("permissions", null, {});
  },
};
