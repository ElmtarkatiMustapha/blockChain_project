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
      mongoose.connect(dbUrl, { useNewUrlParser: true })
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
      mongoose.connect(dbUrl, { useNewUrlParser: true })
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
    
}

//update info
function setFirsName(admin,nom) {
    
}
function setLastName(admin,penom) {
    
}
function setReference(admin,ref) {
    
}

function setUserName(admin,userName) {
    
}
function setPassword(admin,password) {
    
}
function setSexe(admin, sexe) {
    
}
function setDateNaissance(admin, date) {
    
}