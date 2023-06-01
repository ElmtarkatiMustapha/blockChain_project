const router = require("express").Router();

const homeController = require("../controllers/home.controller");

// router.get("/", homeController.getHome);

router.get("/", (req, res, next) => {
  if (typeof req.query.searchType == "undefined") {
    homeController.getHome(req,res,next);
  } else {
    req.query.dataToSearch = req.query.dataToSearch.toUpperCase();
    if (req.query.searchType == "id") {
      homeController.getDiplomesById(req, res, next);
    } else if (req.query.searchType == "cin") {
      homeController.getDiplomesByCin(req, res, next);
    } else if (req.query.searchType == "cne") {
      homeController.getDiplomesByCne(req, res, next);
    } else if (req.query.searchType == "section") {
      homeController.getDiplomesBySection(req, res, next);
    } else if (req.query.searchType == "name") {
      homeController.getDiplomesByName(req, res, next);
    } else {
      homeController.getHome(req, res, next);
    } 
  }
});

module.exports = router;
