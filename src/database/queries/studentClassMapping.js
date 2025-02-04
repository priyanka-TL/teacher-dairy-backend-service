const StudentClassMapping = require("../models/index").studentClassMapping;

module.exports = class StudentData {
  static async create(data) {
    try {
      return await StudentClassMapping.create(data, { returning: true });
    } catch (error) {
      throw error;
    }
  }

  static async findOne(filter, attributes, options) {
    try {
      return await StudentClassMapping.findOne({
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
      return await StudentClassMapping.findAll({
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
      return await StudentClassMapping.findAndCountAll({
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
      const res = await StudentClassMapping.update(updatedata, {
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
