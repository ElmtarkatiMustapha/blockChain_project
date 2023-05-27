const { render } = require("ejs");
const departement = require("../models/departenemt.model");

module.exports = {
  showAll,
  show,
  editPage,
  addNewPage,
  edit,
  addNew,
  remove,
};

function showAll(req, res, next) {
  let message = req.session.successMessage;
  let error = req.session.errorMessage;
  req.session.successMessage = "";
  req.session.errorMessage = "";
  departement
    .getAll()
    .then((data) => {
      if (data) {
        res.render("departements/index", {
          departements: data,
          successMessage: message,
          errorMessage: error,
        });
      } else {
        res.render("404");
      }
    })
    .catch((err) => {
      res.render("404");
    });
}
function show(req, res, next) {
  let id = req.params.id;
  departement
    .getOne(id)
    .then((data) => {
      if (data) {
        res.render("departements/show", {
          departement: data,
        });
      } else {
        res.render("404");
      }
    })
    .catch((err) => {
      res.render("404");
    });
}
function editPage(req, res, next) {
  let id = req.params.id;
  let message = req.session.successMessage;
  let error = req.session.errorMessage;
  req.session.successMessage = "";
  req.session.errorMessage = "";
  departement
    .getOne(id)
    .then((data) => {
      if (data) {
        res.render("departements/edit", {
          departement: data,
          successMessage: message,
          errorMessage: error,
        });
      } else {
        res.render("404");
      }
    })
    .catch((err) => {
      res.render("404");
    });
}
function addNewPage(req, res, next) {
  let message = req.session.successMessage;
  let error = req.session.errorMessage;
  req.session.successMessage = "";
  req.session.errorMessage = "";
  res.render("departements/addNew", {
    successMessage: message,
    errorMessage: error,
  });
}

function addNew(req, res, next) {
  departement
    .addNew(req.body.label, req.body.desc)
    .then((res) => {
      req.session.successMessage = "la departement est ajouter avec succes";
      res.redirect("/departements/addNew");
    })
    .catch((err) => {
      req.session.errorMessage = err;
      res.redirect("/departements/addNew");
    });
}

function edit(req, res, next) {
  if (req.body.label != "") {
    departement.setlabel(req.params.id, req.body.label).then((data) => {
      departement.setDesc(req.params.id, req.body.desc).then((data) => {
        req.session.successMessage =
          "la departement a eté mis a jourer avec success";
        res.redirect("/departements" + req.url);
      });
    });
  }
}
function remove(req, res, next) {
  departement
    .deleteOne(req.params.id)
    .then((data) => {
      req.session.successMessage =
        "la departement a eté supprimer avec success";
      res.redirect("/departements");
    })
    .catch((err) => {
      req.session.errorMessage = err;
      res.redirect("/departements" + req.url);
    });
}
