const { render } = require("ejs");
require("../globals");
const modules = require("../models/module.model");
const evaluation = require("../models/evaluation.model");
const Evaluation = evaluation.Evaluation;
const filiere = require("../models/filiere.model");
const fs = require("fs");
const path = require("path");
const csv = require("fast-csv");
const { rejects } = require("assert");
const { default: mongoose } = require("mongoose");
const Professor = require("../models/professor.model");
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
        filiere.getAll().then((filieres) => {
          if (data) {
            res.render("admin/modules/index", {
              modules: data,
              semester: req.query.semester,
              filiere: req.query.filiere,
              filieres: filieres,
              successMessage: message,
              errorMessage: error,
            });
          } else {
            res.render("admin/modules/index", {
              modules: "",
              semester: req.query.semester,
              filiere: req.query.filiere,
              filieres: filieres,
              successMessage: message,
              errorMessage: error,
            });
          }
        });
      })
      .catch((err) => {
        res.render("404");
      });
  } else if (typeof req.query.filiere != undefined && req.query.filiere != "") {
    modules
      .getByFiliere(req.query.filiere)
      .then((data) => {
        filiere.getAll().then((filieres) => {
          if (data) {
            res.render("admin/modules/index", {
              modules: data,
              semester: "",
              filiere: req.query.filiere,
              filieres: filieres,
              successMessage: message,
              errorMessage: error,
            });
          } else {
            res.render("admin/modules/index", {
              modules: "",
              semester: "",
              filiere: req.query.filiere,
              filieres: filieres,
              successMessage: message,
              errorMessage: error,
            });
          }
        });
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
      if (data != "") {
        Professor.getOne(data.professor).then((prof) => {
          filiere.getOne(data.filiere).then((filiere) => {
            if (
              typeof req.query.validate != undefined &&
              req.query.validate == "true"
            ) {
              modules.getStudentsValide(id).then((students) => {
                res.render("admin/modules/show", {
                  moduleInfo: data,
                  filiereInfo: filiere,
                  validate: true,
                  profInfo: prof,
                  students: students,
                  idModule: id,
                  successMessage: message,
                  errorMessage: error,
                });
              });
            } else {
              modules.getStudentsNoValide(id).then((students) => {
                res.render("admin/modules/show", {
                  moduleInfo: data,
                  filiereInfo: filiere,
                  profInfo: prof,
                  validate: false,
                  students: students,
                  idModule: id,
                  successMessage: message,
                  errorMessage: error,
                });
              });
            }
          });
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
  modules
    .getOne(id)
    .then((data) => {
      if (data) {
        res.render("admin/modules/edit", {
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
  res.render("admin/modules/addNew", {
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

async function saveGrades(req, res, next) {
  let list = [];
  let studentList = req.body.studentRef;
  let gradeList = req.body.grade;
  if (typeof studentList == "undefined") {
    res.redirect("/modules/show/" + req.body.idModule + "?validate=true");
  } else {
    for (let i = 0; i < studentList.length; i++) {
      list.push({ cne: studentList[i], note: gradeList[i] });
    }
    await updateGrade(list, req.body.idModule);
    req.session.successMessage = "les notes sont mise a jourer";
    if (req.body.validate == "true") {
      res.redirect("/modules/show/" + req.body.idModule + "?validate=true");
    } else {
      res.redirect("/modules/show/" + req.body.idModule + "?validate=false");
    }
  }
}

function saveFile(req, res, next) {
  let list = [];
  req.files.file
    .mv(path.join(__dirname, "..", "assets", "tesCSV"))
    .then((err) => {
      if (err) {
        res.send("err");
      }
      fs.createReadStream(path.join(__dirname, "..", "assets", "tesCSV"))
        .pipe(csv.parse({ headers: true, delimiter: ";" }))
        .on("error", (error) => {
          req.session.errorMessage = error;
          res.redirect(
            "/modules/show/" + req.body.idModule + "?validate=false"
          );
        })
        .on("data", (row) => {
          list.push(row);
        })
        .on("end", async (rowCount) => {
          await updateGrade(list, req.body.idModule);
          req.session.successMessage = "les notes sont mise a jourer";
          res.redirect(
            "/modules/show/" + req.body.idModule + "?validate=false"
          );
        });
    })
    .catch((err) => {
      req.session.errorMessage = err;
      res.redirect("/modules/show/" + req.body.idModule + "?validate=false");
    });
}

async function updateGrade(list, id) {
  try {
    await mongoose.connect(urlDb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    for (const data of list) {
      console.log(data.cne, id, data.note);
      const updatedUser = await Evaluation.findOneAndUpdate(
        {
          referenceStudent: data.cne,
          referenceModule: id,
        },
        {
          $set: {
            grade: data.note,
            date: new Date(),
          },
        },
        { new: true }
      );
    }
    mongoose.disconnect();
    console.log("Disconnected from the database");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}