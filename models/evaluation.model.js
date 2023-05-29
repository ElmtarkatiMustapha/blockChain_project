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
  setDate,
  setGrade,
  Evaluation,
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
function getAll() {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(dbUrl, { useNewUrlParser: true })
      .then(() => {
        Evaluation.find()
          .then((evaluations) => {
            mongoose.disconnect();
            resolve(evaluations);
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

//Get one
function getOne(refStudent, refModule) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(dbUrl, { useNewUrlParser: true })
      .then(() => {
        Evaluation.findOne({
          referenceModule: refModule,
          referenceStudent: refStudent,
        })
          .then((evaluation) => {
            mongoose.disconnect();
            resolve(evaluation);
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

//delete one
function deleteOne(refStudent, refModule) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(dbUrl, { useNewUrlParser: true })
      .then(() => {
        Evaluation.deleteOne({
          referenceModule: refModule,
          referenceStudent: refStudent,
        })
          .then((result) => {
            mongoose.disconnect();
            if (result.deletedCount === 1) {
              resolve("Evaluation supprimée avec succès.");
            } else {
              resolve(
                "Aucune évaluation trouvée avec les références fournies."
              );
            }
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

function setDate(refStudent, refModule, date) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(dbUrl, { useNewUrlParser: true })
      .then(() => {
        Evaluation.findOneAndUpdate(
          { referenceModule: refModule, referenceStudent: refStudent },
          { date: date }
        )
          .then(() => {
            mongoose.disconnect();
            resolve("Date de l'évaluation mise à jour avec succès.");
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

function setGrade(refStudent, refModule, grade) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(dbUrl, { useNewUrlParser: true })
      .then(() => {
        Evaluation.findOneAndUpdate(
          { referenceModule: refModule, referenceStudent: refStudent },
          { grade: grade }
        )
          .then(() => {
            mongoose.disconnect();
            resolve("Note de l'évaluation mise à jour avec succès.");
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
