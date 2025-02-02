module.exports = {
  mapTeacherToClass: (req) => {
    req.checkParams("id").notEmpty().withMessage("teacher id is required");
    req
      .checkQuery("class_id")
      .trim()
      .notEmpty()
      .withMessage("class id is required");
  },
};
