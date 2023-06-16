const Departement = require("../models/departenemt.model");
const Student = require("../models/student.model");
const Professor = require("../models/professor.model");
const Admin = require("../models/admin.model");
const Evaluation = require("../models/evaluation.model");
module.exports = {
  getDashbord,
};

function getDashbord(req, res, next) {
  if (req.session.userType == "admin") {
    Departement.getCustomNbr(8)
      .then((data) => {
        let userRef = req.session.userRef;
        Admin.getOne(userRef)
          .then((result) => {
            res.render("admin/index", {
              departements: data,
              user: result,
            });
          })
          .catch((err) => {
            res.render("admin/index", {
              departements: data,
              user: "undefined",
            });
          });
      })
      .catch((err) => {
        res.render("admin/index", {
          error: err,
        });
      });
  } else if (req.session.userType == "professor") {
    let userRef = req.session.userRef;
    Professor.getOne(userRef)
      .then((result) => {
        res.render("professor/index", {
          user: result,
        });
      })
      .catch((err) => {
        res.render("professor/index", {
          user: "undefined",
        });
      });
  } else if (req.session.userType == "student") {
    let userRef = req.session.userRef;
    Student.getOne(userRef)
      .then((result) => {
        Evaluation.getLastGrades(userRef, 5).then((lastGrades) => {
          res.render("student/index", {
            user: result,
            lastGrades: lastGrades,
          });
        });
      })
      .catch((err) => {
        res.render("student/index", {
          user: "undefined",
        });
      });
  } else {
    res.redirect("/login");
  }
}
