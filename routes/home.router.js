const router = require("express").Router();

const homeController = require("../controllers/home.controller");

router.get("/", homeController.getHome);

router.post("/", (req, res, next) => {
  req.body.dataToSearch = req.body.dataToSearch.toUpperCase();
  // console.log(typeof .body.dataToSearch);
  if (req.body.searchType == "id") {
    homeController.getDiplomesById(req, res, next);
  } else if (req.body.searchType == "cin") {
    homeController.getDiplomesByCin(req, res, next);
  } else if (req.body.searchType == "cne") {
    homeController.getDiplomesByCne(req, res, next);
  } else if (req.body.searchType == "session") {
    homeController.getDiplomesBySection(req, res, next);
  } else if (req.body.searchType == "name") {
    homeController.getDiplomesByName(req, res, next);
  }
});

module.exports = router;
