const Departement = require("../models/departenemt.model");
module.exports = {
  getDashbord,
};

function getDashbord(req, res, next) {
  if (req.session.userType == "admin") {
    Departement.getAll()
      .then((data) => {
        res.render("pages/admin", {
          departements: data,
        });
      })
      .catch((err) => {
        res.render("pages/admin", {
          error: err,
        });
      });
  } else if (req.session.userType == "professor") {
    res.render("pages/professor");
  } else if (req.session.userType == "student") {
    res.render("pages/student");
  } else {
    res.redirect("/login");
  }
}
