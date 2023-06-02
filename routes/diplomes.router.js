const router = require("express").Router();
const diplomesController = require("../controllers/diplomes.conttroller");

router.get("/", diplomesController.showAll);
router.post("/deliveredMany", diplomesController.deliveredMany);
// router.post("/deliveredOne", diplomesController.deliveredOne);

module.exports = router;
