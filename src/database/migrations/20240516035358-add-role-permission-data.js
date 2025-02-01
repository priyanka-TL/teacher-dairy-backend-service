"use strict";

require("module-alias/register");
const common = require("@constants/common");
const Permissions = require("@database/models/index").Permission;

const getPermissionId = async (module, request_type, api_path) => {
  try {
    const permission = await Permissions.findOne({
      where: { module, request_type, api_path },
    });

    if (!permission) {
      throw permission;
    }

    return permission.id;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const rolePermissionsData = [
        //class permission
        {
          role_title: common.ADMIN_ROLE,
          permission_id: await getPermissionId(
            "classes",
            ["POST", "DELETE", "GET", "PUT", "PATCH"],
            "/ptd/v1/classes/*"
          ),
          module: "classes",
          request_type: ["POST", "DELETE", "GET", "PUT", "PATCH"],
          api_path: "/ptd/v1/classes/*",
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 0,
        },
        {
          role_title: common.ORG_ADMIN_ROLE,
          permission_id: await getPermissionId(
            "classes",
            ["POST", "DELETE", "GET", "PUT", "PATCH"],
            "/ptd/v1/classes/*"
          ),
          module: "classes",
          request_type: ["POST", "DELETE", "GET", "PUT", "PATCH"],
          api_path: "/ptd/v1/classes/*",
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 0,
        },
        {
          role_title: common.TEACHER_ROLE,
          permission_id: await getPermissionId(
            "classes",
            ["GET"],
            "/ptd/v1/classes/list/*"
          ),
          module: "classes",
          request_type: ["GET"],
          api_path: "/ptd/v1/classes/list/*",
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 0,
        },
        //posts permissions
        {
          role_title: common.ADMIN_ROLE,
          permission_id: await getPermissionId(
            "posts",
            ["POST", "DELETE", "GET", "PUT", "PATCH"],
            "/ptd/v1/posts/*"
          ),
          module: "posts",
          request_type: ["POST", "DELETE", "GET", "PUT", "PATCH"],
          api_path: "/ptd/v1/posts/*",
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 0,
        },
        {
          role_title: common.ORG_ADMIN_ROLE,
          permission_id: await getPermissionId(
            "posts",
            ["POST", "DELETE", "GET", "PUT", "PATCH"],
            "/ptd/v1/posts/*"
          ),
          module: "posts",
          request_type: ["POST", "DELETE", "GET", "PUT", "PATCH"],
          api_path: "/ptd/v1/posts/*",
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 0,
        },
        {
          role_title: common.TEACHER_ROLE,
          permission_id: await getPermissionId(
            "posts",
            ["POST", "DELETE", "GET", "PUT", "PATCH"],
            "/ptd/v1/posts/*"
          ),
          module: "posts",
          request_type: ["POST", "DELETE", "GET", "PUT", "PATCH"],
          api_path: "/ptd/v1/posts/*",
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 0,
        },
        {
          role_title: common.STUDENT_ROLE,
          permission_id: await getPermissionId(
            "posts",
            ["GET"],
            "/ptd/v1/posts/details/*"
          ),
          module: "posts",
          request_type: ["GET"],
          api_path: "/ptd/v1/posts/details/*",
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 0,
        },
        {
          role_title: common.PARENT_ROLE,
          permission_id: await getPermissionId(
            "posts",
            ["GET"],
            "/ptd/v1/posts/details/*"
          ),
          module: "posts",
          request_type: ["GET"],
          api_path: "/ptd/v1/posts/details/*",
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 0,
        },
        {
          role_title: common.PARENT_ROLE,
          permission_id: await getPermissionId(
            "posts",
            ["GET"],
            "/scp/v1/posts/list*"
          ),
          module: "posts",
          request_type: ["GET"],
          api_path: "/scp/v1/posts/list*",
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 0,
        },
        {
          role_title: common.STUDENT_ROLE,
          permission_id: await getPermissionId(
            "posts",
            ["GET"],
            "/scp/v1/posts/list*"
          ),
          module: "posts",
          request_type: ["GET"],
          api_path: "/scp/v1/posts/list*",
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 0,
        },

        //comments
        {
          role_title: common.ORG_ADMIN_ROLE,
          permission_id: await getPermissionId(
            "comments",
            ["POST", "DELETE", "GET", "PUT", "PATCH"],
            "/scp/v1/comments/*"
          ),
          module: "comments",
          request_type: ["POST", "DELETE", "GET", "PUT", "PATCH"],
          api_path: "/scp/v1/comments/*",
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 0,
        },
        {
          role_title: common.ADMIN_ROLE,
          permission_id: await getPermissionId(
            "comments",
            ["POST", "DELETE", "GET", "PUT", "PATCH"],
            "/scp/v1/comments/*"
          ),
          module: "comments",
          request_type: ["POST", "DELETE", "GET", "PUT", "PATCH"],
          api_path: "/scp/v1/comments/*",
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 0,
        },
        {
          role_title: common.TEACHER_ROLE,
          permission_id: await getPermissionId(
            "comments",
            ["POST", "DELETE", "GET", "PUT", "PATCH"],
            "/scp/v1/comments/*"
          ),
          module: "comments",
          request_type: ["POST", "DELETE", "GET", "PUT", "PATCH"],
          api_path: "/scp/v1/comments/*",
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 0,
        },
        {
          role_title: common.STUDENT_ROLE,
          permission_id: await getPermissionId(
            "comments",
            ["POST", "DELETE", "GET", "PUT", "PATCH"],
            "/scp/v1/comments/*"
          ),
          module: "comments",
          request_type: ["POST", "DELETE", "GET", "PUT", "PATCH"],
          api_path: "/scp/v1/comments/*",
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 0,
        },
        {
          role_title: common.PARENT_ROLE,
          permission_id: await getPermissionId(
            "comments",
            ["POST", "DELETE", "GET", "PUT", "PATCH"],
            "/scp/v1/comments/*"
          ),
          module: "comments",
          request_type: ["POST", "DELETE", "GET", "PUT", "PATCH"],
          api_path: "/scp/v1/comments/*",
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 0,
        },

        //entity types permissions
        {
          role_title: common.ADMIN_ROLE,
          permission_id: await getPermissionId(
            "entity-types",
            ["POST", "DELETE", "GET", "PUT", "PATCH"],
            "/scp/v1/entity-types/*"
          ),
          module: "entity-types",
          request_type: ["POST", "DELETE", "GET", "PUT", "PATCH"],
          api_path: "/scp/v1/entity-types/*",
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 0,
        },
        {
          role_title: common.ORG_ADMIN_ROLE,
          permission_id: await getPermissionId(
            "entity-types",
            ["POST", "DELETE", "GET", "PUT", "PATCH"],
            "/scp/v1/entity-types/*"
          ),
          module: "entity-types",
          request_type: ["POST", "DELETE", "GET", "PUT", "PATCH"],
          api_path: "/scp/v1/entity-types/*",
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 0,
        },
        {
          role_title: common.TEACHER_ROLE,
          permission_id: await getPermissionId(
            "entity-types",
            ["POST"],
            "/scp/v1/entity-types/read"
          ),
          module: "entity-types",
          request_type: ["POST"],
          api_path: "/scp/v1/entity-types/read",
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 0,
        },
        {
          role_title: common.STUDENT_ROLE,
          permission_id: await getPermissionId(
            "entity-types",
            ["POST"],
            "/scp/v1/entity-types/read"
          ),
          module: "entity-types",
          request_type: ["POST"],
          api_path: "/scp/v1/entity-types/read",
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 0,
        },
        {
          role_title: common.PARENT_ROLE,
          permission_id: await getPermissionId(
            "entity-types",
            ["POST"],
            "/scp/v1/entity-types/read"
          ),
          module: "entity-types",
          request_type: ["POST"],
          api_path: "/scp/v1/entity-types/read",
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 0,
        },

        //entities
        {
          role_title: common.ADMIN_ROLE,
          permission_id: await getPermissionId(
            "entities",
            ["POST", "DELETE", "GET", "PUT", "PATCH"],
            "/scp/v1/entities/*"
          ),
          module: "entities",
          request_type: ["POST", "DELETE", "GET", "PUT", "PATCH"],
          api_path: "/scp/v1/entities/*",
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 0,
        },
        {
          role_title: common.ORG_ADMIN_ROLE,
          permission_id: await getPermissionId(
            "entities",
            ["POST", "DELETE", "GET", "PUT", "PATCH"],
            "/scp/v1/entities/*"
          ),
          module: "entities",
          request_type: ["POST", "DELETE", "GET", "PUT", "PATCH"],
          api_path: "/scp/v1/entities/*",
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 0,
        },
        {
          role_title: common.TEACHER_ROLE,
          permission_id: await getPermissionId(
            "entities",
            ["POST"],
            "/scp/v1/entities/read"
          ),
          module: "entities",
          request_type: ["POST"],
          api_path: "/scp/v1/entities/read",
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 0,
        },
        {
          role_title: common.PARENT_ROLE,
          permission_id: await getPermissionId(
            "entities",
            ["POST"],
            "/scp/v1/entities/read"
          ),
          module: "entities",
          request_type: ["POST"],
          api_path: "/scp/v1/entities/read",
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 0,
        },
        {
          role_title: common.STUDENT_ROLE,
          permission_id: await getPermissionId(
            "entities",
            ["POST"],
            "/scp/v1/entities/read"
          ),
          module: "entities",
          request_type: ["POST"],
          api_path: "/scp/v1/entities/read",
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 0,
        },

        //permissions
        {
          role_title: common.ADMIN_ROLE,
          permission_id: await getPermissionId(
            "permissions",
            ["POST", "DELETE", "GET", "PUT", "PATCH"],
            "/scp/v1/permissions/*"
          ),
          module: "permissions",
          request_type: ["POST", "DELETE", "GET", "PUT", "PATCH"],
          api_path: "/scp/v1/permissions/*",
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 0,
        },
        {
          role_title: common.ORG_ADMIN_ROLE,
          permission_id: await getPermissionId(
            "permissions",
            ["POST", "DELETE", "GET", "PUT", "PATCH"],
            "/scp/v1/permissions/*"
          ),
          module: "permissions",
          request_type: ["POST", "DELETE", "GET", "PUT", "PATCH"],
          api_path: "/scp/v1/permissions/*",
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 0,
        },
        {
          role_title: common.TEACHER_ROLE,
          permission_id: await getPermissionId(
            "permissions",
            ["GET"],
            "/scp/v1/permissions/list"
          ),
          module: "permissions",
          request_type: ["GET"],
          api_path: "/scp/v1/permissions/list",
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 0,
        },
        {
          role_title: common.STUDENT_ROLE,
          permission_id: await getPermissionId(
            "permissions",
            ["GET"],
            "/scp/v1/permissions/list"
          ),
          module: "permissions",
          request_type: ["GET"],
          api_path: "/scp/v1/permissions/list",
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 0,
        },
        {
          role_title: common.PARENT_ROLE,
          permission_id: await getPermissionId(
            "permissions",
            ["GET"],
            "/scp/v1/permissions/list"
          ),
          module: "permissions",
          request_type: ["GET"],
          api_path: "/scp/v1/permissions/list",
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 0,
        },

        //modules
        {
          role_title: common.ADMIN_ROLE,
          permission_id: await getPermissionId(
            "modules",
            ["POST", "DELETE", "GET", "PUT", "PATCH"],
            "/scp/v1/modules/*"
          ),
          module: "modules",
          request_type: ["POST", "DELETE", "GET", "PUT", "PATCH"],
          api_path: "/scp/v1/modules/*",
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 0,
        },
        {
          role_title: common.ORG_ADMIN_ROLE,
          permission_id: await getPermissionId(
            "modules",
            ["POST", "DELETE", "GET", "PUT", "PATCH"],
            "/scp/v1/modules/*"
          ),
          module: "modules",
          request_type: ["POST", "DELETE", "GET", "PUT", "PATCH"],
          api_path: "/scp/v1/modules/*",
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 0,
        },

        //role permission mapping
        {
          role_title: common.ADMIN_ROLE,
          permission_id: await getPermissionId(
            "role-permission-mapping",
            ["POST", "DELETE", "GET", "PUT", "PATCH"],
            "/scp/v1/role-permission-mapping/*"
          ),
          module: "role-permission-mapping",
          request_type: ["POST", "DELETE", "GET", "PUT", "PATCH"],
          api_path: "/scp/v1/role-permission-mapping/*",
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 0,
        },
        {
          role_title: common.ORG_ADMIN_ROLE,
          permission_id: await getPermissionId(
            "role-permission-mapping",
            ["POST", "DELETE", "GET", "PUT", "PATCH"],
            "/scp/v1/role-permission-mapping/*"
          ),
          module: "role-permission-mapping",
          request_type: ["POST", "DELETE", "GET", "PUT", "PATCH"],
          api_path: "/scp/v1/role-permission-mapping/*",
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 0,
        },
        {
          role_title: common.TEACHER_ROLE,
          permission_id: await getPermissionId(
            "role-permission-mapping",
            ["GET"],
            "/scp/v1/role-permission-mapping/list"
          ),
          module: "role-permission-mapping",
          request_type: ["GET"],
          api_path: "/scp/v1/role-permission-mapping/list",
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 0,
        },
        {
          role_title: common.STUDENT_ROLE,
          permission_id: await getPermissionId(
            "role-permission-mapping",
            ["GET"],
            "/scp/v1/role-permission-mapping/list"
          ),
          module: "role-permission-mapping",
          request_type: ["GET"],
          api_path: "/scp/v1/role-permission-mapping/list",
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 0,
        },
        {
          role_title: common.PARENT_ROLE,
          permission_id: await getPermissionId(
            "role-permission-mapping",
            ["GET"],
            "/scp/v1/role-permission-mapping/list"
          ),
          module: "role-permission-mapping",
          request_type: ["GET"],
          api_path: "/scp/v1/role-permission-mapping/list",
          created_at: new Date(),
          updated_at: new Date(),
          created_by: 0,
        },
      ];
      await queryInterface.bulkInsert(
        "role_permission_mapping",
        rolePermissionsData
      );
    } catch (error) {
      console.error(error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("role_permission_mapping", null, {});
  },
};
