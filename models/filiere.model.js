//filiere model
/*attribute: 
-reference
-title
-description
*/
require("../globals");
const mongoose = require("mongoose");
const filiereSchema = mongoose.Schema({
    reference: String,
    title: String,
    description: String,
    departement:String
})
var Filiere = mongoose.model("filiere", filiereSchema);

//export model functions
module.exports = {
    addNew,
    getAll,
    getOne,
    deleteOne,
    setTitle,
    setDesc,
}

//insert function
function addNew(title,desc) {
    
}

 // Récupération de toutes les filières
 function getAll() {
    return new Promise((resolve, reject) => {
      mongoose.connect(urlDb, { useNewUrlParser: true })
        .then(() => {
          return Filiere.find();
        })
        .then(filieres => {
          mongoose.disconnect();
          resolve(filieres);
        })
        .catch(error => {
          mongoose.disconnect();
          reject(error);
        });
    });
  }
  
  // Récupération d'une filière par référence
  function getOne(ref) {
    return new Promise((resolve, reject) => {
      mongoose.connect(urlDb, { useNewUrlParser: true })
        .then(() => {
          return Filiere.findOne({ reference: ref });
        })
        .then(filiere => {
          mongoose.disconnect();
          resolve(filiere);
        })
        .catch(error => {
          mongoose.disconnect();
          reject(error);
        });
    });
  }
  
  // Suppression d'une filière par référence
  function deleteOne(ref) {
    return new Promise((resolve, reject) => {
      mongoose.connect(urlDb, { useNewUrlParser: true })
        .then(() => {
          return Filiere.deleteOne({ reference: ref });
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
  
  // Mise à jour du titre d'une filière
function setTitle(ref, label) {
    return new Promise((resolve, reject) => {
      mongoose.connect(urlDb, { useNewUrlParser: true })
        .then(() => {
          return Filiere.findOneAndUpdate({ reference: ref }, { title: label }, { new: true });
        })
        .then(updatedFiliere => {
          mongoose.disconnect();
          if (updatedFiliere) {
            resolve("Titre mis à jour avec succès.");
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
  
  // Mise à jour de la description d'une filière
  function setDesc(ref, desc) {
    return new Promise((resolve, reject) => {
      mongoose.connect(urlDb, { useNewUrlParser: true })
        .then(() => {
          return Filiere.findOneAndUpdate({ reference: ref }, { description: desc }, { new: true });
        })
        .then(updatedFiliere => {
          mongoose.disconnect();
          if (updatedFiliere) {
            resolve("Description mise à jour avec succès.");
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
  