// Dependencies
const httpStatusCode = require("@generics/http-status");
const common = require("@constants/common");
const classesQueries = require("@database/queries/classes");
const permissionsQueries = require("@database/queries/permissions");
const {
  UniqueConstraintError,
  ForeignKeyConstraintError,
} = require("sequelize");
const { Op } = require("sequelize");
const responses = require("@helpers/responses");

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
      const classes = await classesQueries.findAll(filter, attributes, options);

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
};
