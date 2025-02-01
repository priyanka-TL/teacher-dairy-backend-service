const Class = require("../models/index").Class;
const { Op } = require("sequelize");

module.exports = class ClassData {
  static async create(data) {
    try {
      return await Class.create(data, { returning: true });
    } catch (error) {
      throw error;
    }
  }

  static async findOne(filter, attributes, options) {
    try {
      return await Class.findOne({
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
      return await Class.findAndCountAll({
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
      const res = await Class.update(updatedata, {
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
