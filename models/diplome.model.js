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
  title: String,
  dateObtained: Date,
  state: Boolean,
  student: String,
});
var Diplome = mongoose.model("diplome", diplomeSchema);

//export model functions
module.exports = {
  addNew,
  getAll,
  getOne,
  deleteOne,
  setDateObtained,
  setTitle,
  setStateDone,
  setStateNotYet,
};

//insert function
function addNew(title, dateObtained, CNE) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        let newDiplome = new Diplome({
          title: title,
          dateObtained: dateObtained,
          state: false,
          student: CNE,
        });
        newDiplome
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

//Get all
function getAll() {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Diplome.find();
      })
      .then((diplomes) => {
        mongoose.disconnect();
        resolve(diplomes);
      })
      .catch((error) => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

//Get one
function getOne(id) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Diplome.findOne({ _id: id });
      })
      .then((diplome) => {
        mongoose.disconnect();
        resolve(diplome);
      })
      .catch((error) => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

//delete one
function deleteOne(id) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Diplome.deleteOne({ _id: id });
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

function setTitle(id, label) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Diplome.findOneAndUpdate(
          { _id: id },
          { title: label },
          { new: true }
        );
      })
      .then((updatedDiplome) => {
        mongoose.disconnect();
        if (updatedDiplome) {
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

function setDateObtained(id, date) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Diplome.findOneAndUpdate(
          { _id: id },
          { dateObtained: date },
          { new: true }
        );
      })
      .then((updatedDiplome) => {
        mongoose.disconnect();
        if (updatedDiplome) {
          resolve("Date d'obtention mise à jour avec succès.");
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

// Mise à jour de l'état d'un diplôme à "Terminé"
function setStateDone(id) {
  return new Promise((resolve, reject) => {
    mongoose.connect(dbUrl, { useNewUrlParser: true })
      .then(() => {
        return Diplome.findOneAndUpdate({ _id: id }, { state: true });
      })
      .then(() => {
        mongoose.disconnect();
        resolve("État du diplôme mis à jour avec succès (Terminé).");
        
      })
      .catch(error => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

// Mise à jour de l'état d'un diplôme à "Pas encore terminé"
function setStateNotYet(id) {
  return new Promise((resolve, reject) => {
    mongoose.connect(dbUrl, { useNewUrlParser: true })
      .then(() => {
        return Diplome.findOneAndUpdate({ _id: id}, { state: false });
      })
      .then(() => {
        mongoose.disconnect();
        resolve("État du diplôme mis à jour avec succès (Pas encore terminé).");
      })
      .catch(error => {
        mongoose.disconnect();
        reject(error);
      });
  });
}
