const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const departementController = require("../controllers/departement.controller");

router.get("/", departementController.showAll);
router.get("/show/:id", departementController.show);
router.get("/edit/:id", departementController.editPage);
router.get("/addNew", departementController.addNewPage);
router.post("/edit/:id", departementController.edit);
router.post("/addNew", departementController.addNew);
router.post("/remove/:id", departementController.remove);

module.exports = router;
