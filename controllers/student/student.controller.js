const { render } = require("ejs");
const student = require("../../models/student.model");
const diplome = require("../../models/diplome.model");
const QRCode = require("qrcode");
module.exports = {
  grades,
  diplomes,
};
function generateQr(id) {
  return new Promise((resolve, reject) => {
    let link = "http://localhost:3000/?searchType=id&dataToSearch=" + id;
    QRCode.toDataURL(link)
      .then((qrData) => {
        resolve(qrData);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function grades(req, res, next) {
  res.render("student/grades/index.ejs");
}

function diplomes(req, res, next) {
  const ref = req.session.userRef;
  diplome.getOneByRef(ref).then((result) => {
    if (result.length != 0 && typeof result != undefined && result != "") {
      generateQr(result[0]._id)
        .then((qrCode) => {
          res.render("student/diplomes/index.ejs", {
            diplome: result[0],
            qrData: qrCode,
          });
        })
        .catch((err) => {
          res.render("student/diplomes/index.ejs", {
            diplome: result[0],
            qrData: "undefined",
          });
        });
    } else {
      res.render("student/diplomes/index.ejs", {
        diplome: result[0],
      });
    }
  });
}
