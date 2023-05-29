const router = require("express").Router();
const moduleController = require("../controllers/module.controller");

router.get("/", moduleController.showAll);
router.get("/show/:id", moduleController.show);
router.get("/edit/:id", moduleController.editPage);
router.get("/addNew", moduleController.addNewPage);
router.post("/edit/:id", moduleController.edit);
router.post("/addNew", moduleController.addNew);
router.post("/saveGrades", moduleController.saveGrades);
router.post("/saveFile", moduleController.saveFile);
router.post("/remove/:id", moduleController.remove);

module.exports = router;
