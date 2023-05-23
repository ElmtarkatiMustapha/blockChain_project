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