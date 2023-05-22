//filiere model
/*attribute: 
-reference
-title
-description
*/
const mongoose = require("mongoose");
const urlDb = ""
const filiereSchema = mongoose.Schema({
    reference: String,
    title: String,
    description: String,
})
var Filiere = mongoose.model("filiere", filiereSchema);

//export model functions
module.exports = {
    addNew,
    getAll,
    getOne,
    deleteOne,
    setReference,
    setTitle,
    setDesc,
}

//insert function
function addNew(title,desc) {
    
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

function setReference(filiere, ref) {
    
}

function setTitle(filiere, label) {
    
}
function setDesc(filiere, desc) {
    
}