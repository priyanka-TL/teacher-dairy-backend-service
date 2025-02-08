const studentsService = require("@services/students");

module.exports = class Students {
  /**
   * Get all students
   * @method
   * @name list
   * @param {String} req.pageNo - Page No.
   * @param {String} req.pageSize - Page size limit.
   * @param {String} req.searchText - Search text.
   * @returns {JSON} - class List.
   */

  async list(req) {
    try {
      const students = await studentsService.list(
        req.query.class_id ? parseInt(req.query.class_id) : "",
        req.decodedToken.organization_id,
        req.pageNo,
        req.pageSize,
        req.searchText
      );
      return students;
    } catch (error) {
      return error;
    }
  }

  /**
   * Map a student to a parent
   * @method
   * @name mapToParent
   * @param {Object} req - The request object.
   * @param {String} req.params.id -  The ID of the class
   * @param {String} req.query.parent_id - The ID of the parent to map.
   * @returns {JSON} - Response indicating success or failure.
   */

  async mapToParent(req) {
    try {
      const result = await studentsService.mapToParent(
        req.params.id,
        req.query.parent_id,
        req.query.relationship,
        req.decodedToken.id,
        req.decodedToken.organization_id
      );

      return result;
    } catch (error) {
      return error;
    }
  }

  /**
   * Student details
   * @method
   * @name details
   * @param {Object} req - The request object.
   * @param {String} req.params.id -  The ID of the student
   * @returns {JSON} - Response indicating success or failure.
   */

  async details(req) {
    try {
      const result = await studentsService.getStudentDetails(req.params.id);
      return result;
    } catch (error) {
      return error;
    }
  }
};
