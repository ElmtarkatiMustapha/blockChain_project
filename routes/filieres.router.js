const router = require("express").Router();
const filiereController = require("../controllers/filieres.controller");

router.get("/", filiereController.showAll);
router.get("/show/:id", filiereController.show);
router.get("/edit/:id", filiereController.editPage);
router.get("/addNew", filiereController.addNewPage);
router.post("/edit/:id", filiereController.edit);
router.post("/addNew", filiereController.addNew);
router.post("/remove/:id", filiereController.remove);

module.exports = router;
