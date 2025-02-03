// Dependencies
const httpStatusCode = require("@generics/http-status");
const common = require("@constants/common");
const ClassTeacherMappingQueries = require("@database/queries/class-teacher-mapping");
const responses = require("@helpers/responses");
const userRequests = require("@requests/user");
const classesQueries = require("@database/queries/classes");

module.exports = class StudentsHelper {
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

      let students = await userRequests.list(
        common.STUDENT_ROLE,
        pageNo,
        limit,
        "",
        organization_id
      );

      if (!students.success) {
        return responses.successResponse({
          statusCode: httpStatusCode.ok,
          message: "TEACHER_LIST_FETCHED_SUCCESSFULLY",
          result,
        });
      }

      if (
        !students.data.result.data ||
        !Array.isArray(students.data.result.data) ||
        students.data.result.data.length === 0
      ) {
        return responses.successResponse({
          statusCode: httpStatusCode.ok,
          message: "TEACHER_LIST_FETCHED_SUCCESSFULLY",
          result: {
            data: [],
            count: 0,
          },
        });
      }

      let userList = [];

      // If classId is provided, filter teachers mapped to that class
      if (classId) {
        // Fetch the list of teachers already mapped to the class
        const mappedTeachers = await ClassTeacherMappingQueries.findAll(
          {
            class_id: parseInt(classId),
            organization_id: organization_id,
          },
          { attributes: ["teacher_id"] }
        );

        // Extract teacher IDs from the mapping
        const mappedTeacherIds = mappedTeachers.map((mapping) =>
          mapping.teacher_id.toString()
        );

        // Filter the teachers list to exclude already mapped teachers
        userList = teachers.data.result.data.filter(
          (teacher) => !mappedTeacherIds.includes(teacher.id.toString())
        );
      } else {
        // If no classId is provided, return all teachers
        userList = teachers.data.result.data;
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

  /**
   * Map a teacher to a class.
   * @method
   * @name mapTeacherToClass
   * @param {Object} bodyData - Mapping data.
   * @param {String} userId - ID of the user performing the action.
   * @param {String} orgId - Organization ID.
   * @returns {JSON} - Mapping response.
   */
  static async mapTeacherToClass(teacherId, classId, userId, orgId) {
    try {
      const classDetail = await classesQueries.findOne({
        id: classId,
        organization_id: orgId,
      });

      if (!classDetail?.id) {
        return responses.failureResponse({
          message: "CLASS_NOT_FOUND",
          statusCode: httpStatusCode.bad_request,
          responseCode: "CLIENT_ERROR",
        });
      }

      // Check if the mapping already exists
      const existingMapping = await ClassTeacherMappingQueries.findOne({
        class_id: classId,
        teacher_id: teacherId,
        organization_id: orgId,
      });

      if (existingMapping?.id) {
        return responses.failureResponse({
          message: "TEACHER_ALREADY_MAPPED_TO_CLASS",
          statusCode: httpStatusCode.bad_request,
          responseCode: "CLIENT_ERROR",
        });
      }

      // Create the mapping
      const mappingData = {
        class_id: classId,
        teacher_id: teacherId,
        organization_id: orgId,
        created_by: userId,
      };

      const createdMapping = await ClassTeacherMappingQueries.create(
        mappingData
      );

      return responses.successResponse({
        statusCode: httpStatusCode.created,
        message: "TEACHER_MAPPED_TO_CLASS_SUCCESSFULLY",
        result: createdMapping,
      });
    } catch (error) {
      throw error;
    }
  }
};
