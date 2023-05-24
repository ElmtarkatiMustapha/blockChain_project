//diplome model
/*attribute: 
-reference
-dateObtained
-title
-state
*/
require("../globals");
const mongoose = require("mongoose");
const diplomeSchema = mongoose.Schema({
    reference: String,
    title: String,
    dateObtained: Date,
    state: Boolean
})
var Diplome = mongoose.model("diplome", diplomeSchema);

//export model functions
module.exports = {
    addNew,
    getAll,
    getOne,
    deleteOne,
    setReference,
    setDateObtained,
    setTitle,
    setStateDone,
    setStateNotYet
}

//insert function
function addNew(dateObtained,title) {
    
}

//Get all
function getAll() {
    return new Promise((resolve, reject) => {
      mongoose.connect(urlDb, { useNewUrlParser: true })
        .then(() => {
          return Diplome.find();
        })
        .then(diplomes => {
          mongoose.disconnect();
          resolve(diplomes);
        })
        .catch(error => {
          mongoose.disconnect();
          reject(error);
        });
    });
  }

//Get one
function getOne(ref) {
    return new Promise((resolve, reject) => {
      mongoose.connect(urlDb, { useNewUrlParser: true })
        .then(() => {
          return Diplome.findOne({ reference: ref });
        })
        .then(diplome => {
          mongoose.disconnect();
          resolve(diplome);
        })
        .catch(error => {
          mongoose.disconnect();
          reject(error);
        });
    });
  }
  

//delete one
function deleteOne(ref) {
    return new Promise((resolve, reject) => {
      mongoose.connect(urlDb, { useNewUrlParser: true })
        .then(() => {
          return Diplome.deleteOne({ reference: ref });
        })
        .then(result => {
          mongoose.disconnect();
          if (result.deletedCount === 1) {
            resolve("Document supprimé avec succès.");
          } else {
            resolve(`Aucun document trouvé avec la référence : ${ref}`);
          }
        })
        .catch(error => {
          mongoose.disconnect();
          reject(error);
        });
    });
  }

  function setTitle(ref, label) {
    return new Promise((resolve, reject) => {
      mongoose.connect(urlDb, { useNewUrlParser: true })
        .then(() => {
          return Diplome.updateOne({ reference:ref }, { title: label });
        })
        .then(() => {
          mongoose.disconnect();
          resolve("Titre mis à jour avec succès.");
        })
        .catch(error => {
          mongoose.disconnect();
          reject(error);
        });
    });
  }

function setDateObtained(ref, date) {
  return new Promise((resolve, reject) => {
    mongoose.connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Diplome.updateOne({ reference : ref }, { dateObtained: date });
      })
      .then(() => {
        mongoose.disconnect();
        resolve("Date d'obtention mise à jour avec succès.");
      })
      .catch(error => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

function setStateDone(ref) {
    
}
function setStateNotYet(ref) {
    
}