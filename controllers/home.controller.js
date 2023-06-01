const { resolve } = require("@truffle/contract/lib/promievent");
const blockChain = require("../models/blockChain.model");
const diplome = require("../models/diplome.model");
const QRCode = require("qrcode");

module.exports = {
  getHome,
  getDiplomesBySection,
  getDiplomesById,
  getDiplomesByCin,
  getDiplomesByCne,
  getDiplomesByName,
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

function getHome(req, res, next) {
  res.render("pages/home", {});
}

function getDiplomesBySection(req, res, next) {
  //get diplomes
  blockChain.getDiplomesBySection(req.query.dataToSearch).then((data) => {
    //render its to the home page
    if (typeof data != "undefined" && data.length > 0) {
      generateQr(data[0].idDiplom)
        .then((qrCode) => {
          res.render("pages/home", { diplomes: data, qrData: qrCode });
        })
        .catch((err) => {
          res.render("pages/home", { diplomes: data, qrData: "qrCode" });
        });
    } else {
      res.render("pages/home", { diplomes: data });
    }
  });
}
function getDiplomesById(req, res, next) {
  //get diplomes
  blockChain.getDiplomesById(req.query.dataToSearch).then((data) => {
    //render its to the home page
    if (typeof data != "undefined" && data.length > 0) {
      generateQr(data[0].idDiplom)
        .then((qrCode) => {
          res.render("pages/home", { diplomes: data, qrData: qrCode });
        })
        .catch((err) => {
          res.render("pages/home", { diplomes: data, qrData: "qrCode" });
        });
    } else {
      res.render("pages/home", { diplomes: data });
    }
  });
}
function getDiplomesByCin(req, res, next) {
  //get diplomes
  blockChain.getDiplomesByCin(req.query.dataToSearch).then((data) => {
    //render its to the home page
    if (typeof data != "undefined" && data.length > 0) {
      generateQr(data[0].idDiplom)
        .then((qrCode) => {
          res.render("pages/home", { diplomes: data, qrData: qrCode });
        })
        .catch((err) => {
          res.render("pages/home", { diplomes: data, qrData: "qrCode" });
        });
    } else {
      res.render("pages/home", { diplomes: data });
    }
  });
}
function getDiplomesByCne(req, res, next) {
  //get diplomes
  blockChain.getDiplomesByCne(req.query.dataToSearch).then((data) => {
    //render its to the home page
    if (typeof data != "undefined" && data.length > 0) {
      generateQr(data[0].idDiplom)
        .then((qrCode) => {
          res.render("pages/home", { diplomes: data, qrData: qrCode });
        })
        .catch((err) => {
          res.render("pages/home", { diplomes: data, qrData: "qrCode" });
        });
    } else {
      res.render("pages/home", { diplomes: data });
    }
  });
}
function getDiplomesByName(req, res, next) {
  //get diplomes
  blockChain.getDiplomesByName(req.query.dataToSearch).then((data) => {
    //render its to the home page
    if (typeof data != "undefined" && data.length > 0) {
      generateQr(data[0].idDiplom)
        .then((qrCode) => {
          res.render("pages/home", { diplomes: data, qrData: qrCode });
        })
        .catch((err) => {
          res.render("pages/home", { diplomes: data, qrData: "qrCode" });
        });
    } else {
      res.render("pages/home", { diplomes: data });
    }
  });
}
