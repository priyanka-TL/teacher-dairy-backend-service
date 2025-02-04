const StudentParentMapping = require("../models/index").StudentParentMapping;

module.exports = class StudentParentMappingData {
  static async create(data) {
    try {
      return await StudentParentMapping.create(data, { returning: true });
    } catch (error) {
      throw error;
    }
  }

  static async findOne(filter, attributes, options) {
    try {
      return await StudentParentMapping.findOne({
        where: filter,
        attributes,
        options,
      });
    } catch (error) {
      throw error;
    }
  }

  static async findAll(filter, attributes, options) {
    try {
      return await StudentParentMapping.findAll({
        where: filter,
        attributes,
        options,
        raw: true,
      });
    } catch (error) {
      return error;
    }
  }

  static async findAndCountAll(filter, attributes, options) {
    try {
      return await StudentParentMapping.findAndCountAll({
        where: filter,
        attributes,
        options,
      });
    } catch (error) {
      throw error;
    }
  }

  static async update(filter, updatedata) {
    try {
      const res = await StudentParentMapping.update(updatedata, {
        where: filter,
        returning: true,
        raw: true,
      });
      return res;
    } catch (error) {
      throw error;
    }
  }
};
