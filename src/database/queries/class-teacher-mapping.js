const ClassTeacherMapping = require("../models/index").ClassTeacherMapping;

module.exports = class ClassTeacherMappingData {
  static async create(data) {
    try {
      return await ClassTeacherMapping.create(data, { returning: true });
    } catch (error) {
      throw error;
    }
  }

  static async findOne(filter, attributes, options) {
    try {
      return await ClassTeacherMapping.findOne({
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
      return await ClassTeacherMapping.findAll({
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
      return await ClassTeacherMapping.findAndCountAll({
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
      const res = await ClassTeacherMapping.update(updatedata, {
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
