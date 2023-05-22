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
    setReference,
    setUserName,
    setPassword,
    setSexe,
    setDateNaissance
}

//insert function
function addNew(fName,lName,ref,sexe,birthday) {
    
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