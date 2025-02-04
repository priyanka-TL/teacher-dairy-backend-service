// Dependencies
const httpStatusCode = require("@generics/http-status");
const common = require("@constants/common");
const StudentParentMappingQueries = require("@database/queries/studentParentMapping");
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
   * Map a student to a parent.
   * @method
   * @name mapToParent
   * @param {Object} req - The request object.
   * @param {String} req.query.student_id - The ID of the student to map.
   * @param {String} req.query.parent_id - The ID of the parent to map.
   * @param {String} req.decodedToken.id - The ID of the user performing the action.
   * @param {String} req.decodedToken.organization_id - The ID of the organization.
   * @returns {JSON} - Response indicating success or failure.
   */
  static async mapToParent(
    studentId,
    parentId,
    relationShip,
    userId,
    organizationId
  ) {
    try {
      // Check if the mapping already exists
      const existingMapping = await StudentParentMappingQueries.findOne({
        student_id: studentId,
        parent_id: parentId,
        organization_id: organizationId,
      });

      console.log(existingMapping, "existingMapping");

      if (existingMapping?.id) {
        return responses.failureResponse({
          message: "STUDENT_ALREADY_MAPPED_TO_PARENT",
          statusCode: httpStatusCode.bad_request,
          responseCode: "CLIENT_ERROR",
        });
      }

      // Create the student-parent mapping
      const mappingData = {
        student_id: studentId,
        parent_id: parentId,
        relationship: relationShip || "Guardian",
        organization_id: organizationId,
        created_by: userId,
      };

      const createdMapping = await StudentParentMappingQueries.create(
        mappingData
      );

      return responses.successResponse({
        statusCode: httpStatusCode.created,
        message: "STUDENT_MAPPED_TO_PARENT_SUCCESSFULLY",
        result: createdMapping,
      });
    } catch (error) {
      return error;
    }
  }
};
