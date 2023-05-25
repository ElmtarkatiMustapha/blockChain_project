//module model
/*attribute: 
-reference
-title
-semester
*/
require("../globals");
const { resolve } = require("@truffle/contract/lib/promievent");
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const moduleSchema = mongoose.Schema({
  title: String,
  semester: String,
  professeur: String,
  filiere: ObjectId,
});
var Module = mongoose.model("module", moduleSchema);

//export model functions
module.exports = {
  addNew,
  getAll,
  getOne,
  deleteOne,
  setTitle,
  setSemester,
};

//insert function
function addNew(title, semester, professeur, filiere) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then((res) => {
        let newModule = new Module({
          title: title,
          semester: semester,
          professeur: professeur,
          filiere: filiere,
        });

        newModule
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

function getAll() {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Module.find({});
      })
      .then((modules) => {
        mongoose.disconnect();
        resolve(modules);
      })
      .catch((error) => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

function getOne(id) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Module.findOne({ _id: id });
      })
      .then((module) => {
        mongoose.disconnect();
        if (module) {
          resolve(module);
        } else {
          resolve(`Aucun module trouvé avec la référence : ${ref}`);
        }
      })
      .catch((error) => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

function deleteOne(id) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Module.findOneAndDelete({ _id: id });
      })
      .then((deletedModule) => {
        mongoose.disconnect();
        if (deletedModule) {
          resolve(deletedModule);
        } else {
          resolve(`Aucun module trouvé avec la référence : ${ref}`);
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
        return Module.findOneAndUpdate(
          { _id: id },
          { title: label },
          { new: true }
        );
      })
      .then((updatedModule) => {
        mongoose.disconnect();
        if (updatedModule) {
          resolve(updatedModule);
        } else {
          resolve(`Aucun module trouvé avec la référence : ${ref}`);
        }
      })
      .catch((error) => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

function setSemester(id, semester) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Module.findOneAndUpdate(
          { _id: id },
          { semester: semester },
          { new: true }
        );
      })
      .then((updatedModule) => {
        mongoose.disconnect();
        if (updatedModule) {
          resolve(updatedModule);
        } else {
          resolve(`Aucun module trouvé avec la référence : ${ref}`);
        }
      })
      .catch((error) => {
        mongoose.disconnect();
        reject(error);
      });
  });
}
