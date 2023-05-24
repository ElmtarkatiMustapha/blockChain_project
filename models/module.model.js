//module model
/*attribute: 
-reference
-title
-semester
*/
require("../globals");
const mongoose = require("mongoose");
const moduleSchema = mongoose.Schema({
    reference: String,
    title: String,
    semester: String,
    professeur:String,
    filiere:String
})
var Module = mongoose.model("module", moduleSchema);

//export model functions
module.exports = {
    addNew,
    getAll,
    getOne,
    deleteOne,
    setTitle,
    setSemester
}

//insert function
function addNew(title,semester) {
    
}

function getAll() {
    return new Promise((resolve, reject) => {
      mongoose.connect(urlDb, { useNewUrlParser: true })
        .then(() => {
          return Module.find({});
        })
        .then(modules => {
          mongoose.disconnect();
          resolve(modules);
        })
        .catch(error => {
          mongoose.disconnect();
          reject(error);
        });
    });
  }
  
  function getOne(ref) {
    return new Promise((resolve, reject) => {
      mongoose.connect(urlDb, { useNewUrlParser: true })
        .then(() => {
          return Module.findOne({ reference: ref });
        })
        .then(module => {
          mongoose.disconnect();
          if (module) {
            resolve(module);
          } else {
            resolve(`Aucun module trouvé avec la référence : ${ref}`);
          }
        })
        .catch(error => {
          mongoose.disconnect();
          reject(error);
        });
    });
  }
  
  function deleteOne(ref) {
    return new Promise((resolve, reject) => {
      mongoose.connect(urlDb, { useNewUrlParser: true })
        .then(() => {
          return Module.findOneAndDelete({ reference: ref });
        })
        .then(deletedModule => {
          mongoose.disconnect();
          if (deletedModule) {
            resolve(deletedModule);
          } else {
            resolve(`Aucun module trouvé avec la référence : ${ref}`);
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
          return Module.findOneAndUpdate({ reference:ref }, { title: label }, { new: true });
        })
        .then(updatedModule => {
          mongoose.disconnect();
          if (updatedModule) {
            resolve(updatedModule);
          } else {
            resolve(`Aucun module trouvé avec la référence : ${ref}`);
          }
        })
        .catch(error => {
          mongoose.disconnect();
          reject(error);
        });
    });
  }

  function setSemester(ref, semester) {
    return new Promise((resolve, reject) => {
      mongoose.connect(ref, { useNewUrlParser: true })
        .then(() => {
          return Module.findOneAndUpdate({ reference:ref }, { semester: semester }, { new: true });
        })
        .then(updatedModule => {
          mongoose.disconnect();
          if (updatedModule) {
            resolve(updatedModule);
          } else {
            resolve(`Aucun module trouvé avec la référence : ${ref}`);
          }
        })
        .catch(error => {
          mongoose.disconnect();
          reject(error);
        });
    });
  }
  