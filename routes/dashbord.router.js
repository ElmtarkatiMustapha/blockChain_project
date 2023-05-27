const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const dashbord = require("../controllers/dashbord.controller");
router.get("/", authController.islogged, dashbord.getDashbord);
module.exports = router;
