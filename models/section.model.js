//section model
/*attribute: 
-reference
-title
*/
require("../globals");
const { promiseImpl } = require("ejs");
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const sectionSchema = mongoose.Schema({
  title: String,
  filiere: ObjectId,
});
var Section = mongoose.model("section", sectionSchema);

//export model functions
module.exports = {
  addNew,
  getAll,
  getOne,
  deleteOne,
  setTitle,
};

//insert function
function addNew(title, filiere) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        let newSection = new Section({
          title: title,
          filiere: filiere,
        });
        newSection
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

// Fonction de récupération de toutes les sections
function getAll() {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Section.find();
      })
      .then((sections) => {
        mongoose.disconnect();
        resolve(sections);
      })
      .catch((error) => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

// Fonction de récupération d'une section par référence
function getOne(id) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Section.findOne({ _id: id });
      })
      .then((section) => {
        mongoose.disconnect();
        resolve(section);
      })
      .catch((error) => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

// Fonction de suppression d'une section par référence
function deleteOne(id) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Section.deleteOne({ _id: id });
      })
      .then((result) => {
        mongoose.disconnect();
        resolve(result);
      })
      .catch((error) => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

// Fonction de mise à jour du titre d'une section
function setTitle(id, title) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Section.findOneAndUpdate({ _id: id }, { title }, { new: true });
      })
      .then((updatedSection) => {
        mongoose.disconnect();
        if (updatedSection) {
          resolve(updatedSection);
        } else {
          resolve(`Aucune section trouvée avec la référence : ${ref}`);
        }
      })
      .catch((error) => {
        mongoose.disconnect();
        reject(error);
      });
  });
}
