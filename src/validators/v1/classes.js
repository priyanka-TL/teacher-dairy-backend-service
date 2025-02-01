module.exports = {
  create: (req) => {
    req.checkBody("name").trim().notEmpty().withMessage("code field is empty");
  },
};
