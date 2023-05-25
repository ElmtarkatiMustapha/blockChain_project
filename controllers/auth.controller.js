const Admin = require("../models/admin.model");
const Professor = require("../models/professor.model");
const Student = require("../models/student.model");

module.exports = {
  getLoginPage: getLoginPage,
  login: login,
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
          res.send("login with succeflly");
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
              res.send("login with succeflly");
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
                  res.send("login with succeflly");
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

function adminLogin(usserName, password) {}
function professorLogin(usserName, password) {}
function studentLogin(usserName, password) {}
