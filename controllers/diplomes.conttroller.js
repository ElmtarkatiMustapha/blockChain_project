const { render } = require("ejs");
const diplome = require("../models/diplome.model");
module.exports = {
  showAll,
  deliveredMany,
};

function showAll(req, res, next) {
  let message = req.session.successMessage;
  let error = req.session.errorMessage;
  req.session.successMessage = "";
  req.session.errorMessage = "";
  if (req.query.delivered == "true") {
    if (req.query.filiere != "undefined") {
      if (req.query.year != "undefined") {
        diplome
          .getStudentsDelivered(req.query.filiere, req.query.year)
          .then((list) => {
            res.render("diplomes/index", {
              diplomes: list,
              delivered: true,
              filiere: req.query.filiere,
              year: req.query.year,
              successMessage: message,
              errorMessage: error,
            });
          });
      } else {
        diplome.getStudentsDelivered(req.query.filiere).then((list) => {
          res.render("diplomes/index", {
            diplomes: list,
            delivered: true,
            filiere: req.query.filiere,
            year: false,
            successMessage: message,
            errorMessage: error,
          });
        });
      }
    } else {
      res.render("404");
    }
  } else {
    if (req.query.filiere != "undefined") {
      if (req.query.year != "undefined") {
        diplome
          .getStudentsNoDelivered(req.query.filiere, req.query.year)
          .then((list) => {
            res.render("diplomes/index", {
              diplomes: list,
              delivered: false,
              filiere: req.query.filiere,
              year: req.query.year,
              successMessage: message,
              errorMessage: error,
            });
          });
      } else {
        diplome.getStudentsNoDelivered(req.query.filiere).then((list) => {
          res.render("diplomes/index", {
            diplomes: list,
            delivered: false,
            filiere: req.query.filiere,
            year: false,
            successMessage: message,
            errorMessage: error,
          });
        });
      }
    } else {
      res.render("404");
    }
  }
}

function deliveredMany(req, res, next) {
  let filiere = req.body.filiere;
  let year = req.body.year;
  let account = req.body.account;
  if (typeof year != "undefined" && year != "" && year == "true") {
    diplome.getStudentsNoDelivered(filiere, year).then((students) => {
      diplome
        .deliveredMany(students, account)
        .then((result) => {
          res.send("good");
        })
        .catch((err) => {
          res.send(err);
        });
    });
  } else {
    diplome.getStudentsNoDelivered(filiere).then((students) => {
      diplome
        .deliveredMany(students, account)
        .then((result) => {
          res.send(result);
        })
        .catch((err) => {
          res.send(err);
        });
    });
  }
}
