//departement model
/*attribute: 
-reference
-libelle
-description
*/
require("../globals");
const mongoose = require("mongoose");
const departementSchema = mongoose.Schema({
    reference: String,
    label: String,
    description: String,
})
var Departement = mongoose.model("departement", departementSchema);

//export model functions
module.exports = {
    addNew,
    getAll,
    getOne,
    deleteOne,
    setReference,
    setlabel,
    setDesc,
}

//insert function
function addNew(label,desc) {
    
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

function setReference(departement, ref) {
    
}

function setlabel(departement, label) {
    
}
function setDesc(departement, desc) {
    
}