// Dependencies
const httpStatusCode = require("@generics/http-status");
const common = require("@constants/common");
const classesQueries = require("@database/queries/classes");
const {
  UniqueConstraintError,
  ForeignKeyConstraintError,
} = require("sequelize");
const { Op } = require("sequelize");
const responses = require("@helpers/responses");
const ClassTeacherMappingQueries = require("@database/queries/class-teacher-mapping");
const studentQueries = require("@database/queries/student");

module.exports = class ClassesHelper {
  /**
   * Create modules.
   * @method
   * @name create
   * @param {Object} bodyData - modules body data.
   * @param {String} id -  id.
   * @returns {JSON} - modules created response.
   */

  static async create(bodyData, userId, orgId) {
    try {
      bodyData.organization_id = orgId;
      bodyData.created_by = userId;
      const createdClass = await classesQueries.create(bodyData);
      return responses.successResponse({
        statusCode: httpStatusCode.created,
        message: "CLASS_CREATED_SUCCESSFULLY",
        result: {
          id: createdClass,
        },
      });
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        return responses.failureResponse({
          message: "CLASS_ALREADY_EXISTS",
          statusCode: httpStatusCode.bad_request,
          responseCode: "CLIENT_ERROR",
        });
      }
      throw error;
    }
  }

  /**
   * Update Class.
   * @method
   * @name update
   * @param {Object} bodyData - class body data.
   * @param {String} _id - class id.
   * @param {String} loggedInUserId - logged in user id.
   * @returns {JSON} - class updated response.
   */

  static async update(id, bodyData, userId, orgId) {
    try {
      const classDetail = await classesQueries.findOne({
        id: id,
        organization_id: orgId,
      });
      if (!classDetail) {
        return responses.failureResponse({
          message: "CLASS_NOT_FOUND",
          statusCode: httpStatusCode.bad_request,
          responseCode: "CLIENT_ERROR",
        });
      }
      bodyData.updated_by = userId;
      const [updateCount, updatedClass] = await classesQueries.update(
        { id },
        bodyData
      );

      if (updateCount == 0) {
        return responses.failureResponse({
          message: "CLASS_NOT_UPDATED",
          statusCode: httpStatusCode.bad_request,
          responseCode: "CLIENT_ERROR",
        });
      } else {
        return responses.successResponse({
          statusCode: httpStatusCode.created,
          message: "CLASS_UPDATED_SUCCESSFULLY",
          result: updatedClass[0],
        });
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * list class.
   * @method
   * @name list
   * @param {String} id -  id.
   * @returns {JSON} - class list response.
   */

  static async list(page, limit, search) {
    try {
      let results = {
        data: [],
        count: 0,
      };
      const offset = common.getPaginationOffset(page, limit);

      const filter = {
        name: { [Op.iLike]: `%${search}%` },
      };
      const options = {
        offset,
        limit,
      };
      const attributes = ["id", "name", "organization_id"];
      const classes = await classesQueries.findAndCountAll(
        filter,
        attributes,
        options
      );

      if (classes.count > 0) {
        results.data = classes.rows;
        results.count = classes.count;
      }

      return responses.successResponse({
        statusCode: httpStatusCode.ok,
        message: "CLASS_FETCHED_SUCCESSFULLY",
        result: results,
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
  static async mapTeacherToClass(classId, teacherId, userId, orgId) {
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

  /**
   * add a student to a class.
   * @method
   * @name addStudent
   * @param {String} classId - ID of the class.
   * @param {String} studentId - ID of the student.
   * @param {String} userId - ID of the user performing the action.
   * @param {String} orgId - Organization ID.
   * @returns {JSON} - Mapping response.
   */
  static async addStudent(classId, studentId, bodyData, userId, orgId) {
    try {
      // Check if class exists in the organization
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

      // Check if the student is already mapped to the class
      const existingMapping = await studentQueries.findOne({
        class_id: classId,
        student_id: studentId,
        organization_id: orgId,
      });

      if (existingMapping?.id) {
        return responses.failureResponse({
          message: "STUDENT_ALREADY_MAPPED_TO_CLASS",
          statusCode: httpStatusCode.bad_request,
          responseCode: "CLIENT_ERROR",
        });
      }

      // Create the mapping
      const mappingData = {
        ...bodyData,
        class_id: classId,
        student_id: studentId,
        organization_id: orgId,
        created_by: userId,
      };

      const createdMapping = await studentQueries.create(mappingData);

      return responses.successResponse({
        statusCode: httpStatusCode.created,
        message: "STUDENT_MAPPED_TO_CLASS_SUCCESSFULLY",
        result: createdMapping,
      });
    } catch (error) {
      throw error;
    }
  }
};
