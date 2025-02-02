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
        req.query.class_id ? parseInt(req.query.class_id) : "",
        req.decodedToken.organization_id,
        req.pageNo,
        req.pageSize,
        req.searchText
      );
      return teachers;
    } catch (error) {
      return error;
    }
  }

  /**
   * Map a teacher to a class
   * @method
   * @name mapTeacherToClass
   * @param {Object} req - The request object.
   * @param {String} req.params.id - The ID of the teacher to map.
   * @param {String} req.query.class_id - The ID of the class to map the teacher to.
   * @returns {JSON} - Response indicating success or failure.
   */

  async mapTeacherToClass(req) {
    try {
      const result = await teachersService.mapTeacherToClass(
        req.params.id,
        req.query.class_id,
        req.decodedToken.id,
        req.decodedToken.organization_id
      );

      return result;
    } catch (error) {
      return error;
    }
  }
};
