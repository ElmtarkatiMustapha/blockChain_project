//evaluation model
/*attribute: 
-referenceModule
-referenceStudent
-grade
-date
*/
require("../globals");
const { Double, ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const evaluationSchema = mongoose.Schema({
  referenceModule: ObjectId,
  referenceStudent: String,
  grade: Number,
  date: Date,
});
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
};

//insert function
function addNew(refModule, refStudent, grade, date) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        let newEvaluation = new Evaluation({
          referenceModule: refModule,
          referenceStudent: refStudent,
          grade: grade,
          date: date,
        });
        newEvaluation
          .save()
          .then((res) => {
            mongoose.disconnect();
            resolve(res);
          })
          .catch((err) => {
            mongoose.disconnect();
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
}

//Get all
function getAll() {}

//Get one
function getOne(ref) {}

//delete one
function deleteOne(ref) {}

function referenceModule(refStudent, refModule, newRef) {}

function referenceStudent(refStudent, refModule, newRef) {}
function setDate(refStudent, refModule, date) {}
function setGrade(refStudent, refModule, grade) {}
