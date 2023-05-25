//filiere model
/*attribute: 
-reference
-title
-description
*/
require("../globals");
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const filiereSchema = mongoose.Schema({
  title: String,
  description: String,
  departement: ObjectId,
});
var Filiere = mongoose.model("filiere", filiereSchema);

//export model functions
module.exports = {
  addNew,
  getAll,
  getOne,
  deleteOne,
  setTitle,
  setDesc,
  Filiere,
};

//insert function
function addNew(title, desc, departement) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        let newFiliere = new Filiere({
          title: title,
          description: desc,
          departement: departement,
        });
        newFiliere
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

// Récupération de toutes les filières
function getAll() {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Filiere.find();
      })
      .then((filieres) => {
        mongoose.disconnect();
        resolve(filieres);
      })
      .catch((error) => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

// Récupération d'une filière par référence
function getOne(id) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Filiere.findOne({ _id: id });
      })
      .then((filiere) => {
        mongoose.disconnect();
        resolve(filiere);
      })
      .catch((error) => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

// Suppression d'une filière par référence
function deleteOne(id) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Filiere.deleteOne({ _id: id });
      })
      .then((result) => {
        mongoose.disconnect();
        if (result.deletedCount === 1) {
          resolve("Document supprimé avec succès.");
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

// Mise à jour du titre d'une filière
function setTitle(id, label) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Filiere.findOneAndUpdate(
          { _id: id },
          { title: label },
          { new: true }
        );
      })
      .then((updatedFiliere) => {
        mongoose.disconnect();
        if (updatedFiliere) {
          resolve("Titre mis à jour avec succès.");
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

// Mise à jour de la description d'une filière
function setDesc(id, desc) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Filiere.findOneAndUpdate(
          { _id: id },
          { description: desc },
          { new: true }
        );
      })
      .then((updatedFiliere) => {
        mongoose.disconnect();
        if (updatedFiliere) {
          resolve("Description mise à jour avec succès.");
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
