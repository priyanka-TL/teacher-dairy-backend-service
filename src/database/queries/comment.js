const Comment = require("../models/index").Comment;
const { Op } = require("sequelize");

module.exports = class CommentData {
  static async create(data) {
    try {
      return await Comment.create(data, { returning: true });
    } catch (error) {
      throw error;
    }
  }

  static async findOne(filter, attributes, options) {
    try {
      return await Comment.findOne({
        where: filter,
        attributes,
        options,
        raw: true,
      });
    } catch (error) {
      throw error;
    }
  }

  static async findAll(filter, attributes, options) {
    try {
      return await Comment.findAll({
        where: filter,
        attributes,
        options,
        raw: true,
      });
    } catch (error) {
      throw error;
    }
  }

  static async findAndCountAll(filter, attributes, options) {
    try {
      return await Comment.findAndCountAll({
        where: filter,
        attributes,
        options,
        raw: true,
      });
    } catch (error) {
      throw error;
    }
  }

  static async update(filter, updatedata) {
    try {
      const res = await Comment.update(updatedata, {
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
