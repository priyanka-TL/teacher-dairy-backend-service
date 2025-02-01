// Dependencies
const httpStatusCode = require("@generics/http-status");
const common = require("@constants/common");
const classesQueries = require("@database/queries/classes");
const responses = require("@helpers/responses");
const userRequests = require("@requests/user");

module.exports = class TeachersHelper {
  /**
   * list class.
   * @method
   * @name list
   * @param {String} id -  id.
   * @returns {JSON} - class list response.
   */

  static async list(classId, organization_id, pageNo, limit) {
    try {
      let result = {
        data: [],
        count: 0,
      };

      let teachers = await userRequests.list(
        common.TEACHER_ROLE,
        pageNo,
        limit,
        "",
        organization_id
      );

      let userList = [];

      if (!teachers.success) {
        return responses.successResponse({
          statusCode: httpStatusCode.ok,
          message: "TEACHER_LIST_FETCHED_SUCCESSFULLY",
          result,
        });
      }

      //written as a beckup will remove once the user service PR merged
      if (
        Array.isArray(teachers?.data?.result?.data) &&
        teachers.data.result.data.length > 0
      ) {
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
};
