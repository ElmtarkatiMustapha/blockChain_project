//departement model
/*attribute: 
-reference
-libelle
-description
*/
require("../globals");
const { resolve } = require("@truffle/contract/lib/promievent");
const mongoose = require("mongoose");
const departementSchema = mongoose.Schema({
  label: String,
  description: String,
});
var Departement = mongoose.model("departement", departementSchema);

//export model functions
module.exports = {
  addNew,
  getAll,
  getOne,
  deleteOne,
  setlabel,
  setDesc,
  Departement,
};

//insert function
function addNew(label, desc) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then((err) => {
        let newDepartement = new Departement({
          label: label,
          description: desc,
        });
        newDepartement
          .save()
          .then((res) => {
            mongoose.disconnect();
            resolve(res);
          })
          .catch((err) => {
            mongoose.disconnect();
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// Récupération de tous les départements
function getAll() {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Departement.find();
      })
      .then((departements) => {
        mongoose.disconnect();
        resolve(departements);
      })
      .catch((error) => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

// Récupération d'un département par référence
function getOne(id) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Departement.findOne({ _id: id });
      })
      .then((departement) => {
        mongoose.disconnect();
        resolve(departement);
      })
      .catch((error) => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

// Suppression d'un département par référence
function deleteOne(id) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Departement.deleteOne({ _id: id });
      })
      .then((result) => {
        mongoose.disconnect();
        if (result.deletedCount === 1) {
          resolve("Document supprimé avec succès.");
        } else {
          resolve(`Aucun document trouvé avec la référence : ${id}`);
        }
      })
      .catch((error) => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

// Mise à jour de la description d'un département
function setDesc(id, desc) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Departement.findOneAndUpdate(
          { _id: id },
          { description: desc },
          { new: true }
        );
      })
      .then((updatedDepartement) => {
        mongoose.disconnect();
        if (updatedDepartement) {
          resolve("Description mise à jour avec succès.");
        } else {
          resolve(`Aucun document trouvé avec la référence : ${id}`);
        }
      })
      .catch((error) => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

// Mise à jour du libellé d'un département
function setlabel(id, label) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Departement.findOneAndUpdate(
          { _id: id },
          { label: label },
          { new: true }
        );
      })
      .then((updatedDepartement) => {
        mongoose.disconnect();
        if (updatedDepartement) {
          resolve("Libellé mis à jour avec succès.");
        } else {
          resolve(`Aucun document trouvé avec la référence : ${ref}`);
        }
      })
      .catch((error) => {
        mongoose.disconnect();
        reject(error);
      });
  });
}
