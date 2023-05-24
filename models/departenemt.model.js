//departement model
/*attribute: 
-reference
-libelle
-description
*/
require("../globals");
const mongoose = require("mongoose");
const departementSchema = mongoose.Schema({
    reference: String,
    label: String,
    description: String,
})
var Departement = mongoose.model("departement", departementSchema);

//export model functions
module.exports = {
    addNew,
    getAll,
    getOne,
    deleteOne,
    setlabel,
    setDesc,
}

//insert function
function addNew(label,desc) {
    
}

// Récupération de tous les départements
  function getAll() {
    return new Promise((resolve, reject) => {
      mongoose.connect(dbUrl, { useNewUrlParser: true })
        .then(() => {
          return Departement.find();
        })
        .then(departements => {
          mongoose.disconnect();
          resolve(departements);
        })
        .catch(error => {
          mongoose.disconnect();
          reject(error);
        });
    });
  }
  

  // Récupération d'un département par référence
  function getOne(ref) {
    return new Promise((resolve, reject) => {
      mongoose.connect(dbUrl, { useNewUrlParser: true })
        .then(() => {
          return Departement.findOne({ reference: ref });
        })
        .then(departement => {
          mongoose.disconnect();
          resolve(departement);
        })
        .catch(error => {
          mongoose.disconnect();
          reject(error);
        });
    });
  }
  
  // Suppression d'un département par référence
  function deleteOne(ref) {
    return new Promise((resolve, reject) => {
      mongoose.connect(dbUrl, { useNewUrlParser: true })
        .then(() => {
          return Departement.deleteOne({ reference: ref });
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
  
  // Mise à jour de la description d'un département
  function setDesc(ref, desc) {
    return new Promise((resolve, reject) => {
      mongoose.connect(dbUrl, { useNewUrlParser: true })
        .then(() => {
          return Departement.updateOne({ reference: ref }, { description: desc });
        })
        .then(() => {
          mongoose.disconnect();
          resolve("Référence mise à jour avec succès.");
        })
        .catch(error => {
          mongoose.disconnect();
          reject(error);
        });
    });
  }
  
  // Mise à jour du libellé d'un département
  function setlabel(ref, label) {
    return new Promise((resolve, reject) => {
      mongoose.connect(dbUrl, { useNewUrlParser: true })
        .then(() => {
          return Departement.updateOne({ reference: ref }, { label: label });
        })
        .then(() => {
          mongoose.disconnect();
          resolve("Libellé mis à jour avec succès.");
        })
        .catch(error => {
          mongoose.disconnect();
          reject(error);
        });
    });
  }
  
  