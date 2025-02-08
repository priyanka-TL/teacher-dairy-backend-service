const Post = require("../models/index").Post;
const { Op } = require("sequelize");

module.exports = class PostData {
  static async create(data) {
    try {
      return await Post.create(data, { returning: true });
    } catch (error) {
      throw error;
    }
  }

  static async findOne(filter, attributes, options) {
    try {
      return await Post.findOne({
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
      return await Post.findAll({
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
      return await Post.findAndCountAll({
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
      const res = await Post.update(updatedata, {
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
