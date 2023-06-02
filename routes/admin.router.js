const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const dashbord = require("../controllers/dashbord.controller");
const departementRouter = require("./departements.router");
const filieresRouter = require("./filieres.router");
const modulesRouter = require("./modules.router");
const diplomesRouter = require("./diplomes.router");
router.use(
  "/departements",
  authController.islogged,
  authController.isAdmin,
  departementRouter
);
router.use(
  "/filieres",
  authController.islogged,
  authController.isAdmin,
  filieresRouter
);
router.use(
  "/modules",
  authController.islogged,
  authController.isAdmin,
  modulesRouter
);
router.use(
  "/diplomes",
  authController.islogged,
  authController.isAdmin,
  diplomesRouter
);
// router.use("/diplomes");
// router.use("/students");
// router.use("/professors");
module.exports = router;
