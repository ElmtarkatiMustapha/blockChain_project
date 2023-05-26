const Admin = require("../models/admin.model");
const Professor = require("../models/professor.model");
const Student = require("../models/student.model");

module.exports = {
  getLoginPage: getLoginPage,
  login: login,
  isNotLogged: isNotLogged,
  islogged: isLogged,
  isAdmin: isAdmin,
  isProfessor: isProfessor,
  isStudent: isStudent,
};

function getLoginPage(req, res, next) {
  res.render("pages/login");
}

function login(req, res, next) {
  let userName = req.body.userName;
  let password = req.body.password;
  if (
    userName != undefined &&
    userName != "" &&
    password != undefined &&
    password != ""
  ) {
    Admin.getByUserName(userName)
      .then((user) => {
        if (user.password === password) {
          req.session.userRef = user.reference;
          req.session.userType = "admin";
          res.redirect("/dashbord");
        } else {
          res.render("pages/login", {
            error: "les information incorrect",
          });
        }
      })
      .catch((err) => {
        Professor.getByUserName(userName)
          .then((user) => {
            if (user.password === password) {
              req.session.userRef = user.reference;
              req.session.userType = "professor";
              res.redirect("/dashbord");
            } else {
              res.render("pages/login", {
                error: "les information incorrect",
              });
              res.render("pages/login", {
                error: "les information incorrect",
              });
            }
          })
          .catch((err) => {
            Student.getByUserName(userName)
              .then((user) => {
                if (user.password === password) {
                  req.session.userRef = user.reference;
                  req.session.userType = "student";
                  res.redirect("/dashbord");
                } else {
                  res.render("pages/login", {
                    error: "les information incorrect",
                  });
                }
              })
              .catch((err) => {
                res.render("pages/login", {
                  error: "les information incorrect",
                });
              });
          });
      });
  }
}

function isNotLogged(req, res, next) {
  if (req.session.userRef === undefined) {
    next();
  } else {
    res.redirect("/Dashbord");
  }
}
function isLogged(req, res, next) {
  if (req.session.userRef === undefined) {
    res.redirect("/login");
  } else {
    next();
  }
}
function isAdmin(req, res, next) {
  if (req.session.userRef == "admin") {
    next();
  } else {
    res.redirect("/login");
  }
}
function isProfessor(req, res, next) {
  if (req.session.userRef == "professor") {
    next();
  } else {
    res.redirect("/login");
  }
}
function isStudent(req, res, next) {
  if (req.session.userRef == "student") {
    next();
  } else {
    res.redirect("/login");
  }
}
