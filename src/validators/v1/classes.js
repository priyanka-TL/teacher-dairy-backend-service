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
  addStudent: (req) => {
    req.checkParams("id").notEmpty().withMessage("class id is required");
    req
      .checkQuery("student_id")
      .trim()
      .notEmpty()
      .withMessage("student_id is required");
    req
      .checkBody("roll_no")
      .trim()
      .notEmpty()
      .withMessage("roll_no field is empty");
  },
};
