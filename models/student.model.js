//student model
/*attribute: 
-ID
-firsName
-LastName
-cne
-userName
-password
-sexe
-birthday
*/
require("../globals");
const generator = require("generate-password");
const { ObjectId } = require("mongodb");
const Admin = require("./admin.model").Admin;
const Professor = require("./professor.model").Professor;
const mongoose = require("mongoose");
const studentSchema = mongoose.Schema({
  reference: String,
  firstName: String,
  lastName: String,
  userName: String,
  password: String,
  cin: String,
  sexe: String,
  birthday: Date,
  currentSemester: Number,
  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "section",
  },
});
var Student = mongoose.model("student", studentSchema);

// const profSchema = mongoose.Schema({
//   reference: String,
//   firstName: String,
//   lastName: String,
//   userName: String,
//   password: String,
//   sexe: String,
//   birthday: Date,
//   specialty: String,
//   departement: String,
// });
// const Professor = mongoose.model("professor", profSchema);

// const adminSchema = mongoose.Schema({
//   reference: String,
//   firstName: String,
//   lastName: String,
//   userName: String,
//   password: String,
//   sexe: String,
//   birthday: Date,
// });

// const Admin = mongoose.model("admin", adminSchema);

//export model functions
module.exports = {
  addNew,
  getAll,
  getOne,
  deleteOne,
  setFirstName,
  setLastName,
  setCne,
  setUserName,
  setPassword,
  setSexe,
  setBirthday,
  getByUserName,
  Student,
};

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
      Student.find({
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

//insert function
function addNew(fName, lName, ref, cin, sexe, birthday, section) {
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
                let newStudent = new Student({
                  reference: ref,
                  firstName: fName,
                  lastName: lName,
                  userName: newUserName,
                  password: password,
                  cin: cin,
                  sexe: sexe,
                  birthday: birthday,
                  section: section,
                });
                newStudent
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
        return Student.find();
      })
      .then((students) => {
        mongoose.disconnect();
        resolve(students);
      })
      .catch((error) => {
        mongoose.disconnect();
        reject(error);
      });
  });
}
function getByUserName(userName) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Student.findOne({
          userName: userName,
        });
      })
      .then((student) => {
        mongoose.disconnect();
        resolve(student);
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
}
function getOne(ref) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Student.findOne({ reference: ref });
      })
      .then((student) => {
        mongoose.disconnect();
        if (student) {
          resolve(student);
        } else {
          resolve(`Aucun étudiant trouvé avec la référence : ${ref}`);
        }
      })
      .catch((error) => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

function deleteOne(ref) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Student.deleteOne({ reference: ref });
      })
      .then((result) => {
        mongoose.disconnect();
        if (result.deletedCount > 0) {
          resolve(`Étudiant supprimé avec succès.`);
        } else {
          resolve(`Aucun étudiant trouvé avec la référence : ${ref}`);
        }
      })
      .catch((error) => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

function setFirstName(ref, nom) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Student.findOneAndUpdate(
          { reference: ref },
          { firstName: nom },
          { new: true }
        );
      })
      .then((updatedStudent) => {
        mongoose.disconnect();
        if (updatedStudent) {
          resolve(updatedStudent);
        } else {
          resolve(`Aucun étudiant trouvé avec la référence : ${ref}`);
        }
      })
      .catch((error) => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

function setLastName(ref, prenom) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Student.findOneAndUpdate(
          { reference: ref },
          { lastName: prenom },
          { new: true }
        );
      })
      .then((updatedStudent) => {
        mongoose.disconnect();
        if (updatedStudent) {
          resolve(updatedStudent);
        } else {
          resolve(`Aucun étudiant trouvé avec la référence : ${ref}`);
        }
      })
      .catch((error) => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

function setCne(ref, cne) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Student.findOneAndUpdate(
          { reference: ref },
          { CNE: cne },
          { new: true }
        );
      })
      .then((updatedStudent) => {
        mongoose.disconnect();
        if (updatedStudent) {
          resolve(updatedStudent);
        } else {
          resolve(`Aucun étudiant trouvé avec la référence : ${ref}`);
        }
      })
      .catch((error) => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

function setUserName(ref, userName) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Student.findOneAndUpdate(
          { reference: ref },
          { userName: userName },
          { new: true }
        );
      })
      .then((updatedStudent) => {
        mongoose.disconnect();
        if (updatedStudent) {
          resolve(updatedStudent);
        } else {
          resolve(`Aucun étudiant trouvé avec la référence : ${ref}`);
        }
      })
      .catch((error) => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

function setPassword(ref, password) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Student.findOneAndUpdate(
          { reference: ref },
          { password: password },
          { new: true }
        );
      })
      .then((updatedStudent) => {
        mongoose.disconnect();
        if (updatedStudent) {
          resolve(updatedStudent);
        } else {
          resolve(`Aucun étudiant trouvé avec la référence : ${ref}`);
        }
      })
      .catch((error) => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

function setSexe(ref, sexe) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Student.findOneAndUpdate(
          { reference: ref },
          { sexe: sexe },
          { new: true }
        );
      })
      .then((updatedStudent) => {
        mongoose.disconnect();
        if (updatedStudent) {
          resolve(updatedStudent);
        } else {
          resolve(`Aucun étudiant trouvé avec la référence : ${ref}`);
        }
      })
      .catch((error) => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

function setBirthday(ref, date) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Student.findOneAndUpdate(
          { reference: ref },
          { birthday: date },
          { new: true }
        );
      })
      .then((updatedStudent) => {
        mongoose.disconnect();
        if (updatedStudent) {
          resolve(updatedStudent);
        } else {
          resolve(`Aucun étudiant trouvé avec la référence : ${ref}`);
        }
      })
      .catch((error) => {
        mongoose.disconnect();
        reject(error);
      });
  });
}
