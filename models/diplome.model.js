//diplome model
/*attribute: 
-reference
-dateObtained
-title
-state
*/
require("../globals");
const mongoose = require("mongoose");
const diplomeSchema = mongoose.Schema({
    reference: String,
    title: String,
    dateObtained: Date,
    state: Boolean
})
var Diplome = mongoose.model("diplome", diplomeSchema);

//export model functions
module.exports = {
    addNew,
    getAll,
    getOne,
    deleteOne,
    setReference,
    setDateObtained,
    setTitle,
    setStateDone,
    setStateNotYet
}

//insert function
function addNew(dateObtained,title) {
    
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

function setReference(doplome, ref) {
    
}

function setTitle(doplome, label) {
    
}
function setDateObtained(diplome,date) {
    
}
function setStateDone(doplome) {
    
}
function setStateNotYet(doplome) {
    
}