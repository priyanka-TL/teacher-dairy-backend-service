const teachersService = require("@services/teachers");

module.exports = class Teachers {
  /**
   * Get all teachers
   * @method
   * @name list
   * @param {String} req.pageNo - Page No.
   * @param {String} req.pageSize - Page size limit.
   * @param {String} req.searchText - Search text.
   * @returns {JSON} - class List.
   */

  async list(req) {
    try {
      const teachers = await teachersService.list(
        req.query.class_id ? req.query.class_id : "",
        req.pageNo,
        req.pageSize,
        req.searchText
      );
      return teachers;
    } catch (error) {
      return error;
    }
  }
};
