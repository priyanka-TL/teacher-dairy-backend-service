module.exports = {
  create: (req) => {
    req.checkBody("name").trim().notEmpty().withMessage("code field is empty");
  },
  mapTeacher: (req) => {
    req.checkParams("id").notEmpty().withMessage("class id is required");
    req
      .checkQuery("teacher_id")
      .trim()
      .notEmpty()
      .withMessage("teacher_id is required");
  },
};
