//admin model
/*attribute: 
-FirsName
-LastName
-reference
-userName
-password
-sexe
-birthday
*/
require("../globals");
const mongoose = require("mongoose");
const adminSchema = mongoose.Schema({
    reference: String,
    firstName: String,
    lastName: String,
    userName: String,
    password: String,
    sexe: String,
    birthday: Date,
})

var Admin = mongoose.model("admin", adminSchema);
//export model functions
module.exports = {
    addNew,
    getAll,
    getOne,
    deleteOne,
    setFirsName,
    setLastName,
    setUserName,
    setPassword,
    setSexe,
    setDateNaissance
}

//insert function
function addNew(fName,lName,sexe,birthday) {
    let ref = "43HGFU";
    let userName = "Bouchra";
    let password = "pass"
    mongoose.connect(urlDb, { useNewUrlParser: true }).then((err) => {
        let newAdmin = new Admin({
            reference: ref,
            firstName: fName,
            lastName: lName,
            userName: userName,
            password: password,
            sexe: sexe,
            birthday: birthday,
        })
        newAdmin.save().then((result, err) => {
            mongoose.disconnect();
        })
    })
    
}

//Get all
function getAll() {
    return new Promise((resolve, reject) => {
      mongoose.connect(urlDb, { useNewUrlParser: true })
        .then(() => {
          return Admin.find();
        })
        .then(admins => {
          mongoose.disconnect();
          resolve(admins);
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
          return Admin.findOne({ reference: ref });
        })
        .then(admin => {
          mongoose.disconnect();
          resolve(admin);
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
          return Admin.deleteOne({ reference: ref });
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
//update info
// Update first name
function setFirstName(ref, nom) {
    return new Promise((resolve, reject) => {
      mongoose.connect(urlDb, { useNewUrlParser: true })
        .then(() => {
          return Admin.findOneAndUpdate({ reference: ref }, { $set: { firstName: nom }});
        })
        .then(updatedAdmin => {
          mongoose.disconnect();
          if (updatedAdmin) {
            resolve("Prénom mis à jour avec succès.");
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
  // Update last name
  function setLastName(ref, nom) {
    return new Promise((resolve, reject) => {
      mongoose.connect(urlDb, { useNewUrlParser: true })
        .then(() => {
          return Admin.findOneAndUpdate({ reference: ref }, { lastName: nom }, { new: true });
        })
        .then(updatedAdmin => {
          mongoose.disconnect();
          if (updatedAdmin) {
            resolve("Nom de famille mis à jour avec succès.");
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
  // Update user name
  function setUserName(ref, userName) {
    return new Promise((resolve, reject) => {
      mongoose.connect(urlDb, { useNewUrlParser: true })
        .then(() => {
          return Admin.findOneAndUpdate({ reference: ref }, { $set: { userName: userName } });
        })
        .then(updatedAdmin => {
          mongoose.disconnect();
          if (updatedAdmin) {
            resolve("Nom d'utilisateur mis à jour avec succès.");
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

  // Update password
  function setPassword(ref, password) {
    return new Promise((resolve, reject) => {
      mongoose.connect(urlDb, { useNewUrlParser: true })
        .then(() => {
          return Admin.findOneAndUpdate({ reference: ref }, { password: password }, { new: true });
        })
        .then(updatedAdmin => {
          mongoose.disconnect();
          if (updatedAdmin) {
            resolve("Mot de passe mis à jour avec succès.");
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
  // Update Sex
  function setSexe(ref, sexe) {
    return new Promise((resolve, reject) => {
      mongoose.connect(urlDb, { useNewUrlParser: true })
        .then(() => {
          return Admin.findOneAndUpdate({ reference: ref }, { sexe: sexe }, { new: true });
        })
        .then(updatedAdmin => {
          mongoose.disconnect();
          if (updatedAdmin) {
            resolve("Sexe mis à jour avec succès.");
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
  
  function setDateNaissance(ref, date) {
    return new Promise((resolve, reject) => {
      mongoose.connect(urlDb, { useNewUrlParser: true })
        .then(() => {
          return Admin.findOneAndUpdate({ reference: ref }, { birthday: date }, { new: true });
        })
        .then(updatedAdmin => {
          mongoose.disconnect();
          if (updatedAdmin) {
            resolve("Date de naissance mise à jour avec succès.");
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
  