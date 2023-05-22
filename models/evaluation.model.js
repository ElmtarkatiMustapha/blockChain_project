//evaluation model
/*attribute: 
-referenceModule
-referenceStudent
-grade
-date
*/
require("../globals");
const { Double } = require("mongodb");
const mongoose = require("mongoose");
const evaluationSchema = mongoose.Schema({
    referenceModule: String,
    referenceStudent: String,
    grade: Double,
    date: Date,
})
var Evaluation = mongoose.model("evaluation", evaluationSchema);


//export model functions
module.exports = {
    addNew,
    getAll,
    getOne,
    deleteOne,
    referenceModule,
    referenceStudent,
    setDate,
    setGrade,
}

//insert function
function addNew(refModule,refStudent,grade,date) {
    
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

function referenceModule(refStudent, refModule, newRef) {
    
}

function referenceStudent(refStudent, refModule, newRef) {
    
}
function setDate(refStudent, refModule,date) {
    
}
function setGrade(refStudent, refModule,grade) {
    
}