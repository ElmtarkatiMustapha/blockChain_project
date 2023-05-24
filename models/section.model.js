//section model
/*attribute: 
-reference
-title
*/
require("../globals");
const mongoose = require("mongoose");
const sectionSchema = mongoose.Schema({
    reference: String,
    title: String,
    filiere:String
})
var Section = mongoose.model("section", sectionSchema);

//export model functions
module.exports = {
    addNew,
    getAll,
    getOne,
    deleteOne,
    setTitle,
}

//insert function
function addNew(title) {
    
}

// Fonction de récupération de toutes les sections
function getAll() {
    return new Promise((resolve, reject) => {
      mongoose.connect(urlDb, { useNewUrlParser: true })
        .then(() => {
          return Section.find();
        })
        .then(sections => {
          mongoose.disconnect();
          resolve(sections);
        })
        .catch(error => {
          mongoose.disconnect();
          reject(error);
        });
    });
  }
  
  // Fonction de récupération d'une section par référence
  function getOne(ref) {
    return new Promise((resolve, reject) => {
      mongoose.connect(urlDb, { useNewUrlParser: true })
        .then(() => {
          return Section.findOne({ reference: ref });
        })
        .then(section => {
          mongoose.disconnect();
          resolve(section);
        })
        .catch(error => {
          mongoose.disconnect();
          reject(error);
        });
    });
  }
  
  // Fonction de suppression d'une section par référence
  function deleteOne(ref) {
    return new Promise((resolve, reject) => {
      mongoose.connect(urlDb, { useNewUrlParser: true })
        .then(() => {
          return Section.deleteOne({ reference: ref });
        })
        .then(result => {
          mongoose.disconnect();
          resolve(result);
        })
        .catch(error => {
          mongoose.disconnect();
          reject(error);
        });
    });
  }
  
  // Fonction de mise à jour du titre d'une section
  function setTitle(ref, title) {
    return new Promise((resolve, reject) => {
      mongoose.connect(urlDb, { useNewUrlParser: true })
        .then(() => {
          return Section.findOneAndUpdate({ reference: ref }, { title }, { new: true });
        })
        .then(updatedSection => {
          mongoose.disconnect();
          if (updatedSection) {
            resolve(updatedSection);
          } else {
            resolve(`Aucune section trouvée avec la référence : ${ref}`);
          }
        })
        .catch(error => {
          mongoose.disconnect();
          reject(error);
        });
    });
  }
  
  
  