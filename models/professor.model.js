//professeur model
/*attribute: 
-firstName
-lastName
-reference
-userName
-password
-sexe
-birthday
-specialty
*/
require("../globals");
const mongoose = require("mongoose");
const profSchema = mongoose.Schema({
    reference: String,
    firstName: String,
    lastName: String,
    userName: String,
    password: String,
    sexe: String,
    birthday: Date,
    specialty:String,
    departement: String
})
var Professor = mongoose.model("professor", profSchema);
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
    setSpecialty,
    Professor
}

//insert function
function addNew(fName,lName,ref,sexe,birthday,specialty) {
    
}

// Fonction de récupération de tous les professeurs
function getAll() {
  return new Promise((resolve, reject) => {
    mongoose.connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Professor.find();
      })
      .then(professors => {
        mongoose.disconnect();
        resolve(professors);
      })
      .catch(error => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

// Fonction de récupération d'un professeur par référence
function getOne(ref) {
  return new Promise((resolve, reject) => {
    mongoose.connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Professor.findOne({ reference: ref });
      })
      .then(professor => {
        mongoose.disconnect();
        resolve(professor);
      })
      .catch(error => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

// Fonction de suppression d'un professeur par référence
function deleteOne(ref) {
  return new Promise((resolve, reject) => {
    mongoose.connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Professor.deleteOne({ reference: ref });
      })
      .then(result => {
        mongoose.disconnect();
        resolve(result);
      })
      .catch(error => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

// Fonction de mise à jour du prénom d'un professeur
function setFirstName(ref, nom) {
  return new Promise((resolve, reject) => {
    mongoose.connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Professor.findOneAndUpdate({ reference: ref}, { firstName: nom }, { new: true });
      })
      .then(updatedProfessor => {
        mongoose.disconnect();
        if (updatedProfessor) {
          resolve(updatedProfessor);
        } else {
          resolve(`Aucun professeur trouvé avec la référence : ${ref}`);
        }
      })
      .catch(error => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

// Fonction de mise à jour du nom de famille d'un professeur
function setLastName(ref, prenom) {
  return new Promise((resolve, reject) => {
    mongoose.connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Professor.findOneAndUpdate({ reference: ref}, { lastName: prenom }, { new: true });
      })
      .then(updatedProfessor => {
        mongoose.disconnect();
        if (updatedProfessor) {
          resolve(updatedProfessor);
        } else {
          resolve(`Aucun professeur trouvé avec la référence : ${ref}`);
        }
      })
      .catch(error => {
        mongoose.disconnect();
        reject(error);
      });
  });
}



// Fonction de mise à jour du nom d'utilisateur d'un professeur
function setUserName(ref, userName) {
  return new Promise((resolve, reject) => {
    mongoose.connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Professor.findOneAndUpdate({ reference: ref}, { userName }, { new: true });
      })
      .then(updatedProfessor => {
        mongoose.disconnect();
        if (updatedProfessor) {
          resolve(updatedProfessor);
        } else {
          resolve(`Aucun professeur trouvé avec la référence : ${ref}`);
        }
      })
      .catch(error => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

// Fonction de mise à jour du mot de passe d'un professeur
function setPassword(ref, password) {
  return new Promise((resolve, reject) => {
    mongoose.connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Professor.findOneAndUpdate({reference: ref }, { password }, { new: true });
      })
      .then(updatedProfessor => {
        mongoose.disconnect();
        if (updatedProfessor) {
          resolve(updatedProfessor);
        } else {
          resolve(`Aucun professeur trouvé avec la référence : ${prof.reference}`);
        }
      })
      .catch(error => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

// Fonction de mise à jour du sexe d'un professeur
function setSexe(ref, sexe) {
  return new Promise((resolve, reject) => {
    mongoose.connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Professor.findOneAndUpdate({ reference: ref }, { sexe }, { new: true });
      })
      .then(updatedProfessor => {
        mongoose.disconnect();
        if (updatedProfessor) {
          resolve(updatedProfessor);
        } else {
          resolve(`Aucun professeur trouvé avec la référence : ${prof.reference}`);
        }
      })
      .catch(error => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

// Fonction de mise à jour de la date de naissance d'un professeur
function setDateNaissance(ref, date) {
  return new Promise((resolve, reject) => {
    mongoose.connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Professor.findOneAndUpdate({ reference: ref }, { birthday: date }, { new: true });
      })
      .then(updatedProfessor => {
        mongoose.disconnect();
        if (updatedProfessor) {
          resolve(updatedProfessor);
        } else {
          resolve(`Aucun professeur trouvé avec la référence : ${prof.reference}`);
        }
      })
      .catch(error => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

// Fonction de mise à jour de la spécialité d'un professeur
function setSpecialty(ref, specialite) {
  return new Promise((resolve, reject) => {
    mongoose.connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Professor.findOneAndUpdate({reference: ref }, { specialty: specialite }, { new: true });
      })
      .then(updatedProfessor => {
        mongoose.disconnect();
        if (updatedProfessor) {
          resolve(updatedProfessor);
        } else {
          resolve(`Aucun professeur trouvé avec la référence : ${prof.reference}`);
        }
      })
      .catch(error => {
        mongoose.disconnect();
        reject(error);
      });
  });
}


