//section model
/*attribute: 
-reference
-title
*/
require("../globals");
const mongoose = require("mongoose");
const sectionSchema = mongoose.Schema({
    reference: String,
    title: String,
})
var Section = mongoose.model("section", sectionSchema);

//export model functions
module.exports = {
    addNew,
    getAll,
    getOne,
    deleteOne,
    setReference,
    setTitle,
}

//insert function
function addNew(title) {
    
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

function setReference(section, ref) {
    
}

function setTitle(section, label) {
    
}