const { render } = require("ejs");
const diplome = require("../models/diplome.model");
const filiere = require("../models/filiere.model");
module.exports = {
  showAll,
  deliveredMany,
  deliveredOne,
};

function showAll(req, res, next) {
  let message = req.session.successMessage;
  let error = req.session.errorMessage;
  req.session.successMessage = "";
  req.session.errorMessage = "";
  if (req.query.delivered == "true") {
    if (
      typeof req.query.filiere != "undefined" &&
      req.query.filiere != "" &&
      req.query.filiere != "false"
    ) {
      if (typeof req.query.year != "undefined") {
        diplome
          .getStudentsDelivered(req.query.filiere, req.query.year)
          .then((list) => {
            let table = [];
            list.forEach((item) => {
              table.push({
                cne: item.studentInfos.reference,
                fullName:
                  item.studentInfos.firstName +
                  " " +
                  item.studentInfos.lastName,
                section: item.sectionInfos.title,
                state: req.query.delivered,
              });
            });
            filiere.getAll().then((allFilieres) => {
              res.render("admin/diplomes/index", {
                diplomes: table,
                delivered: true,
                filiereChecked: req.query.filiere,
                filieres: allFilieres,
                year: req.query.year,
                successMessage: message,
                errorMessage: error,
              });
            });
          });
      } else {
        diplome.getStudentsDelivered(req.query.filiere).then((list) => {
          let table = [];
          list.forEach((item) => {
            table.push({
              cne: item.studentInfos.reference,
              fullName:
                item.studentInfos.firstName + " " + item.studentInfos.lastName,
              section: item.sectionInfos.title,
              state: req.query.delivered,
            });
          });
          filiere.getAll().then((allFilieres) => {
            res.render("admin/diplomes/index", {
              diplomes: table,
              delivered: true,
              filieres: allFilieres,
              filiereChecked: req.query.filiere,
              year: false,
              successMessage: message,
              errorMessage: error,
            });
          });
        });
      }
    } else {
      filiere.getAll().then((allFilieres) => {
        res.render("admin/diplomes/index", {
          diplomes: false,
          delivered: true,
          filieres: allFilieres,
          filiereChecked: false,
          year: false,
          successMessage: message,
          errorMessage: error,
        });
      });
    }
  } else {
    if (
      typeof req.query.filiere != "undefined" &&
      req.query.filiere != "" &&
      req.query.filiere != "false"
    ) {
      if (typeof req.query.year != "undefined") {
        diplome
          .getStudentsNoDelivered(req.query.filiere, req.query.year)
          .then((list) => {
            let table = [];
            list.forEach((item) => {
              table.push({
                cne: item.reference,
                fullName: item.firstName + " " + item.lastName,
                section: item.sectionData.title,
                state: req.query.delivered,
              });
            });
            filiere.getAll().then((allFilieres) => {
              res.render("admin/diplomes/index", {
                diplomes: table,
                delivered: false,
                filieres: allFilieres,
                filiereChecked: req.query.filiere,
                year: req.query.year,
                successMessage: message,
                errorMessage: error,
              });
            });
          });
      } else {
        diplome.getStudentsNoDelivered(req.query.filiere).then((list) => {
          let table = [];
          list.forEach((item) => {
            table.push({
              cne: item.reference,
              fullName: item.firstName + " " + item.lastName,
              section: item.sectionData.title,
              state: req.query.delivered,
            });
          });
          filiere.getAll().then((allFilieres) => {
            res.render("admin/diplomes/index", {
              diplomes: table,
              delivered: false,
              filiereChecked: req.query.filiere,
              filieres: allFilieres,
              year: false,
              successMessage: message,
              errorMessage: error,
            });
          });
        });
      }
    } else {
      filiere.getAll().then((allFilieres) => {
        res.render("admin/diplomes/index", {
          diplomes: false,
          delivered: false,
          filieres: allFilieres,
          filiereChecked: false,
          year: false,
          successMessage: message,
          errorMessage: error,
        });
      });
    }
  }
}

function deliveredMany(req, res, next) {
  let filiere = req.body.filiere;
  let year = req.body.year;
  let account = req.body.account;
  if (typeof year != "undefined" && year != "" && year != "false") {
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

function deliveredOne(req, res, next) {
  let filiere = req.body.filiere;
  let reference = req.body.reference;
  let account = req.body.account;
  diplome
    .deliveredOne(account, filiere, reference)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
}