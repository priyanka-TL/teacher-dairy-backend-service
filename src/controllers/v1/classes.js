const classesService = require("@services/classes");

module.exports = class Classes {
  /**
   * create class
   * @method
   * @name create
   * @param {Object} req - request data.
   * @returns {JSON} - class creation object.
   */

  async create(req) {
    try {
      const createdClass = await classesService.create(
        req.body,
        req.decodedToken.id,
        req.decodedToken.organization_id
      );
      return createdClass;
    } catch (error) {
      return error;
    }
  }

  /**
   * updates class
   * @method
   * @name update
   * @param {Object} req - request data.
   * @returns {JSON} - class updation response.
   */

  async update(req) {
    try {
      const updatedClass = await classesService.update(
        req.params.id,
        req.body,
        req.decodedToken.id,
        req.decodedToken.organization_id
      );
      return updatedClass;
    } catch (error) {
      return error;
    }
  }

  /**
   * Get all available class
   * @method
   * @name list
   * @param {String} req.pageNo - Page No.
   * @param {String} req.pageSize - Page size limit.
   * @param {String} req.searchText - Search text.
   * @returns {JSON} - class List.
   */

  async list(req) {
    try {
      const classList = await classesService.list(
        req.pageNo,
        req.pageSize,
        req.searchText
      );
      return classList;
    } catch (error) {
      return error;
    }
  }
};
