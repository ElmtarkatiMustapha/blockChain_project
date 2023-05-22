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
})
var Student = mongoose.model("student", studentSchema);
//export model functions
module.exports = {
    addNew,
    getAll,
    getOne,
    deleteOne,
    setFirsName,
    setLastName,
    setCne,
    setUserName,
    setPassword,
    setSexe,
    setBirthday,
}

//insert function
function addNew(fName,lName,cne,sexe,birthday) {
    
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
function setFirsName(student,nom) {
    
}
function setLastName(student,penom) {
    
}
function setCne(student,cne) {
    
}

function setUserName(student,userName) {
    
}
function setPassword(student,password) {
    
}
function setSexe(student, sexe) {
    
}
function setBirthday(student, date) {
    
}

