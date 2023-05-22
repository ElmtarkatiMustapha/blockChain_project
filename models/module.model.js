//module model
/*attribute: 
-reference
-title
-semester
*/
const mongoose = require("mongoose");
const urlDb = ""
const moduleSchema = mongoose.Schema({
    reference: String,
    title: String,
    semester: String,
})
var Module = mongoose.model("module", moduleSchema);

//export model functions
module.exports = {
    addNew,
    getAll,
    getOne,
    deleteOne,
    setReference,
    setTitle,
    setSemester
}

//insert function
function addNew(title,semester) {
    
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

function setReference(module, ref) {
    
}

function setTitle(module, label) {
    
}
function setSemester(module, semester) {
    
}