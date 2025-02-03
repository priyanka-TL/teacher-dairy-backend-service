// Dependencies
const httpStatusCode = require("@generics/http-status");
const common = require("@constants/common");
const ClassTeacherMappingQueries = require("@database/queries/class-teacher-mapping");
const responses = require("@helpers/responses");
const userRequests = require("@requests/user");
const classesQueries = require("@database/queries/classes");
const { Op } = require("sequelize");

module.exports = class TeachersHelper {
  /**
   * list class.
   * @method
   * @name list
   * @param {String} id -  id.
   * @returns {JSON} - class list response.
   */

  static async list(classId, organization_id, pageNo, limit, search) {
    try {
      let result = {
        data: [],
        count: 0,
      };

      let userList = [];

      if (classId) {
        // If classId is provided, fetch teachers mapped to that class
        let classMappings = await ClassTeacherMappingQueries.findAll(
          {
            class_id: classId,
            organization_id: organization_id,
          },
          { attributes: ["teacher_id"] }
        );

        // Extract teacher IDs
        const mappedTeacherIds = classMappings.map((mapping) =>
          mapping.teacher_id.toString()
        );

        if (mappedTeacherIds.length === 0) {
          return responses.successResponse({
            statusCode: httpStatusCode.ok,
            message: "TEACHER_LIST_FETCHED_SUCCESSFULLY",
            result,
          });
        }

        // Fetch teachers mapped to the given classId
        let teachers = await userRequests.list(
          common.TEACHER_ROLE,
          pageNo,
          limit,
          search,
          organization_id
        );

        if (!teachers.success) {
          return responses.successResponse({
            statusCode: httpStatusCode.ok,
            message: "TEACHER_LIST_FETCHED_SUCCESSFULLY",
            result,
          });
        }

        // Filter teachers to include only those mapped to the classId
        userList = teachers.data.result.data.filter((teacher) =>
          mappedTeacherIds.includes(teacher.id.toString())
        );
      } else {
        // If no classId is provided, fetch all teachers
        let teachers = await userRequests.list(
          common.TEACHER_ROLE,
          pageNo,
          limit,
          search,
          organization_id
        );

        if (!teachers.success) {
          return responses.successResponse({
            statusCode: httpStatusCode.ok,
            message: "TEACHER_LIST_FETCHED_SUCCESSFULLY",
            result,
          });
        }

        userList = teachers.data.result.data;

        // Extract all teacher IDs
        const teacherIds = userList.map((teacher) => teacher.id.toString());

        if (teacherIds.length > 0) {
          // Fetch all class-teacher mappings for these teachers
          let classMappings = await ClassTeacherMappingQueries.findAll(
            {
              teacher_id: {
                [Op.in]: teacherIds,
              },
              organization_id: organization_id,
            },
            { attributes: ["teacher_id", "class_id"] }
          );

          // Fetch class details for mapped class IDs
          const classIds = [...new Set(classMappings.map((c) => c.class_id))];
          let classDetails = [];

          if (classIds.length > 0) {
            classDetails =
              (await classesQueries.findAll(
                {
                  id: { [Op.in]: classIds },
                  organization_id: organization_id,
                },
                { attributes: ["id", "name"] }
              )) || [];
          }

          // Create a map of class details
          const classMap = classDetails.reduce((map, cls) => {
            map[cls.id] = cls.name;
            return map;
          }, {});

          // Create a mapping of teacher -> class array
          const teacherClassMap = classMappings.reduce((map, mapping) => {
            if (!map[mapping.teacher_id]) {
              map[mapping.teacher_id] = [];
            }
            map[mapping.teacher_id].push({
              id: mapping.class_id,
              name: classMap[mapping.class_id] || "Unknown",
            });
            return map;
          }, {});

          // Assign classes to each teacher
          userList = userList.map((teacher) => ({
            ...teacher,
            classes: teacherClassMap[teacher.id.toString()] || [],
          }));
        }
      }

      return responses.successResponse({
        statusCode: httpStatusCode.ok,
        message: "TEACHER_LIST_FETCHED_SUCCESSFULLY",
        result: {
          data: userList,
          count: userList.length,
        },
      });
    } catch (error) {
      throw error;
    }
  }
};
