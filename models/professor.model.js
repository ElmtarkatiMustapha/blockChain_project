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
const mongoose = require("mongoose");
const profSchema = mongoose.Schema({
    reference: String,
    firstName: String,
    lastName: String,
    userName: String,
    password: String,
    sexe: String,
    birthday: Date,
    specialty:String
})
var Professor = mongoose.model("professor", profSchema);
//export model functions
module.exports = {
    addNew,
    getAll,
    getOne,
    deleteOne,
    setFirsName,
    setLastName,
    setReference,
    setUserName,
    setPassword,
    setSexe,
    setDateNaissance,
    setSpecialty
}

//insert function
function addNew(fName,lName,ref,sexe,birthday,specialty) {
    
}

//Get all
function getAll() {
    
}

//Get one
function getOne(ref) {
    
}

//delete one
function deleteOne(ref) {
    
}

//update info
function setFirsName(prof,nom) {
    
}
function setLastName(prof,penom) {
    
}
function setReference(prof,ref) {
    
}

function setUserName(prof,userName) {
    
}
function setPassword(prof,password) {
    
}
function setSexe(prof, sexe) {
    
}
function setDateNaissance(prof, date) {
    
}
function setSpecialty(prof, specialite) {
    
}

