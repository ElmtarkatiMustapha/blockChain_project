
const blockChain = require("../models/blockChain.model");
const diplome = require("../models/diplome.model");

module.exports = {
    getHome,
    getDiplomesBySection,
    getDiplomesById,
    getDiplomesByCin,
    getDiplomesByCne,
    getDiplomesByName
}


function getHome(req, res, next) {
    res.render("pages/home")
}

function getDiplomesBySection(req, res, next) {
    //get diplomes
        blockChain.getDiplomesBySection(req.body.dataToSearch).then((data) => {
            //render its to the home page 
            res.render("pages/home",{diplomes : data});
        })
}
function getDiplomesById(req, res, next) {
    //get diplomes
        blockChain.getDiplomesById(req.body.dataToSearch).then((data) => {
            //render its to the home page 
            res.render("pages/home",{diplomes : data});
        })
}
function getDiplomesByCin(req, res, next) {
    //get diplomes
        blockChain.getDiplomesByCin(req.body.dataToSearch).then((data) => {
            //render its to the home page 
            res.render("pages/home",{diplomes : data});
        })
}
function getDiplomesByCne(req, res, next) {
    //get diplomes
        blockChain.getDiplomesByCne(req.body.dataToSearch).then((data) => {
            //render its to the home page 
            res.render("pages/home",{diplomes : data});
        })
}
function getDiplomesByName(req, res, next) {
    //get diplomes
        blockChain.getDiplomesByName(req.body.dataToSearch).then((data) => {
            //render its to the home page 
            res.render("pages/home",{diplomes : data});
        })
}

