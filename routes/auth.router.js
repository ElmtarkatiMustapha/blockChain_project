const router = require("express").Router();
const authController = require("../controllers/auth.controller");

router.get("/login", authController.isNotLogged, authController.getLoginPage);
router.get("/logout", authController.islogged, authController.logout);

router.post("/login", authController.isNotLogged, authController.login);

module.exports = router;
