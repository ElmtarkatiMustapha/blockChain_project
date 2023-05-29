const { render } = require("ejs");
const modules = require("../models/module.model");
const filiere = require("../models/filiere.model");
const fs = require("fs");
const path = require("path");
const csv = require("fast-csv");
module.exports = {
  showAll,
  show,
  editPage,
  addNewPage,
  edit,
  addNew,
  remove,
  saveGrades,
  saveFile,
};

function showAll(req, res, next) {
  let message = req.session.successMessage;
  let error = req.session.errorMessage;
  req.session.successMessage = "";
  req.session.errorMessage = "";
  if (
    req.query.filiere != undefined &&
    req.query.filiere != "" &&
    req.query.semester != undefined &&
    req.query.semester != ""
  ) {
    modules
      .getCustom(req.query.filiere, req.query.semester)
      .then((data) => {
        if (data) {
          res.render("modules/index", {
            modules: data,
            semester: req.query.semester,
            filiere: req.query.filiere,
            successMessage: message,
            errorMessage: error,
          });
        } else {
          res.render("modules/index", {
            modules: "",
            semester: req.query.semester,
            filiere: req.query.filiere,
            successMessage: message,
            errorMessage: error,
          });
        }
      })
      .catch((err) => {
        res.render("404");
      });
  } else if (req.query.filiere != undefined && req.query.filiere != "") {
    modules
      .getByFiliere(req.query.filiere)
      .then((data) => {
        if (data) {
          res.render("filieres/index", {
            modules: data,
            semester: "",
            filiere: req.query.filiere,
            successMessage: message,
            errorMessage: error,
          });
        } else {
          res.render("filieres/index", {
            modules: "",
            semester: "",
            filiere: req.query.filiere,
            successMessage: message,
            errorMessage: error,
          });
        }
      })
      .catch((err) => {
        res.render("404");
      });
  } else {
    filiere.getAll().then((data) => {
      let idFiliere = data[0]._id;
      res.redirect("/modules?filiere=" + idFiliere);
    });
  }
}
function show(req, res, next) {
  let id = req.params.id;
  let message = req.session.successMessage;
  let error = req.session.errorMessage;
  req.session.successMessage = "";
  req.session.errorMessage = "";
  modules
    .getOne(id)
    .then((data) => {
      if (req.query.validate == "true") {
        modules.getStudentsValide(id).then((students) => {
          if (data != "") {
            res.render("modules/show", {
              moduleInfo: data,
              students: students,
              successMessage: message,
              errorMessage: error,
            });
          } else {
            res.render("404");
          }
        });
      } else {
        modules.getStudentsNoValide(id).then((students) => {
          if (data != "") {
            res.render("modules/show", {
              moduleInfo: data,
              students: students,
              successMessage: message,
              errorMessage: error,
            });
          } else {
            res.render("404");
          }
        });
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
  modules
    .getOne(id)
    .then((data) => {
      if (data) {
        res.render("modules/edit", {
          moduleInfo: data,
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
  let filiere = "";
  let semester = "";
  req.session.successMessage = "";
  req.session.errorMessage = "";
  if (typeof req.query.filiere != "undefined") {
    filiere = req.query.filiere;
  }
  if (typeof req.query.semester != "undefined") {
    semester = req.query.semester;
  }
  res.render("modules/addNew", {
    filiere: filiere,
    semester: semester,
    successMessage: message,
    errorMessage: error,
  });
}
function addNew(req, res, next) {
  modules
    .addNew(
      req.body.title,
      req.body.semester,
      req.body.professeur,
      req.body.filiere
    )
    .then((res) => {
      req.session.successMessage = "le module a  ete ajouter avec succes";
      res.redirect("/modules/addNew");
    })
    .catch((err) => {
      req.session.errorMessage = err;
      res.redirect("/modules/addNew");
    });
}

function edit(req, res, next) {
  modules
    .update(
      req.params.id,
      req.body.title,
      req.body.semester,
      req.body.professor,
      req.body.filiere
    )
    .then((data) => {
      req.session.successMessage = data;
      res.redirect("/modules" + req.url);
    })
    .catch((err) => {
      req.session.errorMessage = err;
      res.redirect("/modules" + req.url);
    });
}
function remove(req, res, next) {
  modules
    .deleteOne(req.params.id)
    .then((data) => {
      req.session.successMessage = "le module a eté supprimer avec success";
      res.redirect("/modules");
    })
    .catch((err) => {
      req.session.errorMessage = err;
      res.redirect("/modules" + req.url);
    });
}

function saveGrades(req, res, next) {
  console.log(req.body.grade);
  console.log(req.body.studentRef);
  res.send("grade: " + req.body.grade + " <br>Student: " + req.body.studentRef);
}

function saveFile(req, res, next) {
  // fs.createReadStream(req.files.file.tempFilePath)
  //   .pipe(csv.parse({ headers: true, delimiter: ";" }))
  //   .on("error", (error) => console.error(error))
  //   .on("data", (row) => console.log(row.name))
  //   .on("end", (rowCount) => console.log(`Parsed ${rowCount} rows`));
  req.files.file
    .mv(path.join(__dirname, "..", "assets", "tesCSV"))
    .then((err) => {
      if (err) {
        res.send("err");
      }
      fs.createReadStream(path.join(__dirname, "..", "assets", "tesCSV"))
        .pipe(csv.parse({ headers: true, delimiter: ";" }))
        .on("error", (error) => console.error(error))
        .on("data", (row) => {
          console.log(row);
        })
        .on("end", (rowCount) => res.send("yes"));
    });
  // res.send("no");
  // console.log(JSON.parse(req.files.file.data.toString()));
}
