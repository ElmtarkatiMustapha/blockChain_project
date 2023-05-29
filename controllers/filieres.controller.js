const { render } = require("ejs");
const filiere = require("../models/filiere.model");
const modules = require("../models/module.model");
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
  if (
    req.query.departement != undefined &&
    req.query.departement != "" &&
    req.query.cycle != undefined &&
    req.query.cycle != ""
  ) {
    filiere
      .getCustom(req.query.departement, req.query.cycle)
      .then((data) => {
        if (data) {
          res.render("filieres/index", {
            filieres: data,
            cycle: req.query.cycle,
            departement: req.query.departement,
            successMessage: message,
            errorMessage: error,
          });
        } else {
          res.render("filieres/index", {
            filieres: "",
            cycle: req.query.cycle,
            departement: req.query.departement,
            successMessage: message,
            errorMessage: error,
          });
        }
      })
      .catch((err) => {
        res.render("404");
      });
  } else if (req.query.cycle != undefined && req.query.cycle != "") {
    filiere
      .getByCycle(req.query.cycle)
      .then((data) => {
        if (data) {
          res.render("filieres/index", {
            filieres: data,
            cycle: req.query.cycle,
            departement: "",
            successMessage: message,
            errorMessage: error,
          });
        } else {
          res.render("filieres/index", {
            filieres: "",
            cycle: req.query.cycle,
            departement: "",
            successMessage: message,
            errorMessage: error,
          });
        }
      })
      .catch((err) => {
        res.render("404");
      });
  } else if (
    req.query.departement != undefined &&
    req.query.departement != ""
  ) {
    filiere
      .getByDepartement(req.query.departement)
      .then((data) => {
        if (data) {
          res.render("filieres/index", {
            filieres: data,
            cycle: "",
            departement: req.query.departement,
            successMessage: message,
            errorMessage: error,
          });
        } else {
          res.render("filieres/index", {
            filieres: "",
            cycle: "",
            departement: req.query.departement,
            successMessage: message,
            errorMessage: error,
          });
        }
      })
      .catch((err) => {
        res.render("404");
      });
  } else {
    filiere
      .getAll()
      .then((data) => {
        if (data) {
          res.render("filieres/index", {
            filieres: data,
            cycle: "",
            departement: "",
            successMessage: message,
            errorMessage: error,
          });
        } else {
          res.render("filieres/index", {
            filieres: "",
            cycle: "",
            departement: "",
            successMessage: message,
            errorMessage: error,
          });
        }
      })
      .catch((err) => {
        res.render("404");
      });
  }
}
function show(req, res, next) {
  let id = req.params.id;
  let message = req.session.successMessage;
  let error = req.session.errorMessage;
  req.session.successMessage = "";
  req.session.errorMessage = "";
  filiere
    .getOne(id)
    .then((data) => {
      if (data) {
        modules
          .getByFiliere(id)
          .then((modulesData) => {
            if (modulesData) {
              res.render("filieres/show", {
                filiere: data,
                modules: modulesData,
                successMessage: message,
                errorMessage: error,
              });
            } else {
              res.render("filieres/show", {
                filiere: data,
                modules: "",
                successMessage: message,
                errorMessage: error,
              });
            }
          })
          .catch((err) => {
            res.render("404");
            // console.log(err);
            // res.send(err);
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
  filiere
    .getOne(id)
    .then((data) => {
      if (data) {
        modules
          .getByFiliere(id)
          .then((modulesData) => {
            if (modulesData) {
              res.render("filieres/edit", {
                filiere: data,
                modules: modulesData,
                successMessage: message,
                errorMessage: error,
              });
            } else {
              res.render("filieres/edit", {
                filiere: data,
                modules: "",
                successMessage: message,
                errorMessage: error,
              });
            }
          })
          .catch((err) => {
            res.render("404");
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
  let departement = "";
  let cycle = "";
  req.session.successMessage = "";
  req.session.errorMessage = "";
  if (typeof req.query.departement != "undefined") {
    departement = req.query.departement;
  }
  if (typeof req.query.cycle != "undefined") {
    cycle = req.query.cycle;
  }
  res.render("filieres/addNew", {
    departement: departement,
    cycle: cycle,
    successMessage: message,
    errorMessage: error,
  });
}
function addNew(req, res, next) {
  filiere
    .addNew(req.body.title, req.body.desc, req.body.cycle, req.body.departement)
    .then((res) => {
      req.session.successMessage = "la filiere est ajouter avec succes";
      res.redirect("/filieres/addNew");
      // res.send("good job");
    })
    .catch((err) => {
      req.session.errorMessage = err;
      res.redirect("/filieres/addNew");
    });
}

function edit(req, res, next) {
  filiere
    .update(
      req.params.id,
      req.body.title,
      req.body.desc,
      req.body.departement,
      req.body.cycle
    )
    .then((data) => {
      req.session.successMessage = data;
      res.redirect("/filieres" + req.url);
    })
    .catch((err) => {
      req.session.errorMessage = err;
      res.redirect("/filieres" + req.url);
    });
}
function remove(req, res, next) {
  filiere
    .deleteOne(req.params.id)
    .then((data) => {
      req.session.successMessage = "la filiere a eté supprimer avec success";
      res.redirect("/filieres");
    })
    .catch((err) => {
      req.session.errorMessage = err;
      res.redirect("/filieres" + req.url);
    });
}
