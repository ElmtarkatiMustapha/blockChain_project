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
const generator = require("generate-password");
const mongoose = require("mongoose");
const Professor = require("./professor.model").Professor;
const Student = require("./student.model").Student;
// const functions = require("./functions");

const adminSchema = mongoose.Schema({
  reference: String,
  firstName: String,
  lastName: String,
  userName: String,
  password: String,
  sexe: String,
  birthday: Date,
});

const Admin = mongoose.model("admin", adminSchema);
//export model functions
module.exports = {
  addNew,
  getAll,
  getOne,
  deleteOne,
  setFirstName,
  setLastName,
  setUserName,
  setPassword,
  setSexe,
  setDateNaissance,
  Admin,
};

//insert function
function checkUserName(userName) {
  return new Promise((resolve, reject) => {
    mongoose.connect(urlDb, { useNewUrlParser: true }).then((err) => {
      Admin.find({
        userName: userName,
      }).then((res) => {
        if (res.length === 0) {
          Professor.find({
            userName: userName,
          }).then((res) => {
            if (res.length === 0) {
              Student.find({
                userName: userName,
              }).then((res) => {
                if (res.length === 0) {
                  mongoose.disconnect();
                  resolve(userName);
                } else {
                  mongoose.disconnect();
                  userName += Math.floor(Math.random() * 10) + 1;
                  resolve(checkUserName(userName));
                }
              });
            } else {
              mongoose.disconnect();
              userName += Math.floor(Math.random() * 10) + 1;
              resolve(checkUserName(userName));
            }
          });
        } else {
          mongoose.disconnect();
          userName += Math.floor(Math.random() * 10) + 1;
          resolve(checkUserName(userName));
        }
      });
    });
  });
}

function checkRef(ref) {
  return new Promise((resolve, reject) => {
    mongoose.connect(urlDb, { useNewUrlParser: true }).then((err) => {
      Admin.find({
        reference: ref,
      }).then((result) => {
        if (result.length === 0) {
          mongoose.disconnect();
          resolve(true);
        } else {
          mongoose.disconnect();
          reject(false);
        }
      });
    });
  });
}
function addNew(fName, lName, ref, sexe, birthday) {
  return new Promise((resolve, reject) => {
    let userName = fName + "_" + lName;
    userName = userName.replaceAll(" ", "");
    let password = generator.generate({
      length: 8,
      numbers: true,
    });
    checkRef(ref)
      .then((res) => {
        if (res) {
          checkUserName(userName).then((newUserName) => {
            mongoose
              .connect(urlDb, { useNewUrlParser: true })
              .then((err) => {
                let newAdmin = new Admin({
                  reference: ref,
                  firstName: fName,
                  lastName: lName,

                  userName: newUserName,
                  password: password,
                  sexe: sexe,
                  birthday: birthday,
                });
                newAdmin
                  .save()
                  .then((result, err) => {
                    if (err === undefined) {
                      mongoose.disconnect();
                      resolve(result);
                    } else {
                      mongoose.disconnect();
                      reject(err);
                    }
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
      })
      .catch((err) => {
        reject("le reference est deja exist");
      });
  });
}

//Get all
function getAll() {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Admin.find();
      })
      .then((admins) => {
        mongoose.disconnect();
        resolve(admins);
      })
      .catch((error) => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

//Get one
function getOne(ref) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Admin.findOne({ reference: ref });
      })
      .then((admin) => {
        mongoose.disconnect();
        resolve(admin);
      })
      .catch((error) => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

//delete one
function deleteOne(ref) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Admin.deleteOne({ reference: ref });
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
//update info
// Update first name
function setFirstName(ref, nom) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Admin.findOneAndUpdate(
          { reference: ref },
          { $set: { firstName: nom } }
        );
      })
      .then((updatedAdmin) => {
        mongoose.disconnect();
        if (updatedAdmin) {
          resolve("Prénom mis à jour avec succès.");
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
// Update last name
function setLastName(ref, nom) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Admin.findOneAndUpdate(
          { reference: ref },
          { lastName: nom },
          { new: true }
        );
      })
      .then((updatedAdmin) => {
        mongoose.disconnect();
        if (updatedAdmin) {
          resolve("Nom de famille mis à jour avec succès.");
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
// Update user name
function setUserName(ref, userName) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Admin.findOneAndUpdate(
          { reference: ref },
          { $set: { userName: userName } }
        );
      })
      .then((updatedAdmin) => {
        mongoose.disconnect();
        if (updatedAdmin) {
          resolve("Nom d'utilisateur mis à jour avec succès.");
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

// Update password
function setPassword(ref, password) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Admin.findOneAndUpdate(
          { reference: ref },
          { password: password },
          { new: true }
        );
      })
      .then((updatedAdmin) => {
        mongoose.disconnect();
        if (updatedAdmin) {
          resolve("Mot de passe mis à jour avec succès.");
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
// Update Sex
function setSexe(ref, sexe) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Admin.findOneAndUpdate(
          { reference: ref },
          { sexe: sexe },
          { new: true }
        );
      })
      .then((updatedAdmin) => {
        mongoose.disconnect();
        if (updatedAdmin) {
          resolve("Sexe mis à jour avec succès.");
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

function setDateNaissance(ref, date) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Admin.findOneAndUpdate(
          { reference: ref },
          { birthday: date },
          { new: true }
        );
      })
      .then((updatedAdmin) => {
        mongoose.disconnect();
        if (updatedAdmin) {
          resolve("Date de naissance mise à jour avec succès.");
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
