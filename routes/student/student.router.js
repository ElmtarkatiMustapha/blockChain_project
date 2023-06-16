const router = require("express").Router();
const authController = require("../../controllers/auth.controller");
const studentController = require("../../controllers/student/student.controller");

router.get(
  "/grades",
  authController.islogged,
  authController.isStudent,
  studentController.grades
);
router.get(
  "/diplomes",
  authController.islogged,
  authController.isStudent,
  studentController.diplomes
);

module.exports = router;
