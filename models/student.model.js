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
const mongoose = require("mongoose");
const studentSchema = mongoose.Schema({
    reference: String,
    firstName: String,
    lastName: String,
    userName: String,
    password: String,
    sexe: String,
    birthday: Date,
    CNE:String,
    section:String
})
var Student = mongoose.model("student", studentSchema);
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
    Student
}

//insert function
function addNew(fName,lName,cne,sexe,birthday) {
    
}

//Get all
function getAll() {
  return new Promise((resolve, reject) => {
    mongoose.connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Student.find();
      })
      .then(students => {
        mongoose.disconnect();
        resolve(students);
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
        return Student.findOne({ reference: ref });
      })
      .then(student => {
        mongoose.disconnect();
        if (student) {
          resolve(student);
        } else {
          resolve(`Aucun étudiant trouvé avec la référence : ${ref}`);
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
        return Student.deleteOne({ reference: ref });
      })
      .then(result => {
        mongoose.disconnect();
        if (result.deletedCount > 0) {
          resolve(`Étudiant supprimé avec succès.`);
        } else {
          resolve(`Aucun étudiant trouvé avec la référence : ${ref}`);
        }
      })
      .catch(error => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

function setFirstName(ref, nom) {
  return new Promise((resolve, reject) => {
    mongoose.connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Student.findOneAndUpdate({reference:ref}, { firstName: nom }, { new: true });
      })
      .then(updatedStudent => {
        mongoose.disconnect();
        if (updatedStudent) {
          resolve(updatedStudent);
        } else {
          resolve(`Aucun étudiant trouvé avec la référence : ${student.reference}`);
        }
      })
      .catch(error => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

function setLastName(ref, prenom) {
  return new Promise((resolve, reject) => {
    mongoose.connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Student.findOneAndUpdate({reference:ref}, { lastName: prenom }, { new: true });
      })
      .then(updatedStudent => {
        mongoose.disconnect();
        if (updatedStudent) {
          resolve(updatedStudent);
        } else {
          resolve(`Aucun étudiant trouvé avec la référence : ${student.reference}`);
        }
      })
      .catch(error => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

function setCne(ref, cne) {
  return new Promise((resolve, reject) => {
    mongoose.connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Student.findOneAndUpdate({reference:ref}, { CNE: cne }, { new: true });
      })
      .then(updatedStudent => {
        mongoose.disconnect();
        if (updatedStudent) {
          resolve(updatedStudent);
        } else {
          resolve(`Aucun étudiant trouvé avec la référence : ${student.reference}`);
        }
      })
      .catch(error => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

function setUserName(ref, userName) {
  return new Promise((resolve, reject) => {
    mongoose.connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Student.findOneAndUpdate({reference:ref}, { userName: userName }, { new: true });
      })
      .then(updatedStudent => {
        mongoose.disconnect();
        if (updatedStudent) {
          resolve(updatedStudent);
        } else {
          resolve(`Aucun étudiant trouvé avec la référence : ${student.reference}`);
        }
      })
      .catch(error => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

function setPassword(ref, password) {
  return new Promise((resolve, reject) => {
    mongoose.connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Student.findOneAndUpdate({reference:ref}, { password: password }, { new: true });
      })
      .then(updatedStudent => {
        mongoose.disconnect();
        if (updatedStudent) {
          resolve(updatedStudent);
        } else {
          resolve(`Aucun étudiant trouvé avec la référence : ${student.reference}`);
        }
      })
      .catch(error => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

function setSexe(ref, sexe) {
  return new Promise((resolve, reject) => {
    mongoose.connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Student.findOneAndUpdate({reference:ref}, { sexe: sexe }, { new: true });
      })
      .then(updatedStudent => {
        mongoose.disconnect();
        if (updatedStudent) {
          resolve(updatedStudent);
        } else {
          resolve(`Aucun étudiant trouvé avec la référence : ${student.reference}`);
        }
      })
      .catch(error => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

function setBirthday(ref, date) {
  return new Promise((resolve, reject) => {
    mongoose.connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Student.findOneAndUpdate({reference:ref}, { birthday: date }, { new: true });
      })
      .then(updatedStudent => {
        mongoose.disconnect();
        if (updatedStudent) {
          resolve(updatedStudent);
        } else {
          resolve(`Aucun étudiant trouvé avec la référence : ${student.reference}`);
        }
      })
      .catch(error => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

