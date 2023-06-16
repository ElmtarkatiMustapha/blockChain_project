//diplome model
/*attribute: 
-reference
-dateObtained
-title
-state
*/
require("../globals");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const Student = require("./student.model").Student;
const Evaluation = require("./evaluation.model").Evaluation;
const BlockChain = require("./blockChain.model");
const { resolve } = require("@truffle/contract/lib/promievent");
const PromiEvent = require("@truffle/contract/lib/promievent");
const diplomeSchema = mongoose.Schema({
  title: String,
  dateObtained: Date,
  state: Boolean,
  student: String,
});
const Diplome = mongoose.model("diplome", diplomeSchema);

//export model functions
module.exports = {
  Diplome,
  addNew,
  getAll,
  getOne,
  deleteOne,
  setDateObtained,
  setTitle,
  setStateDone,
  setStateNotYet,
  getStudentsNoDelivered,
  getStudentsDelivered,
  deliveredMany,
  deliveredOne,
  getOneByRef,
};

//insert function
function addNew(title, dateObtained, CNE) {
  return new Promise((resolve, reject) => {
    let newDiplome = new Diplome({
      title: title,
      dateObtained: dateObtained,
      state: true,
      student: CNE,
    });
    newDiplome
      .save()
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
// function addNew(title, dateObtained, CNE) {
//   return new Promise((resolve, reject) => {
//     mongoose
//       .connect(urlDb, { useNewUrlParser: true })
//       .then(() => {
//         let newDiplome = new Diplome({
//           title: title,
//           dateObtained: dateObtained,
//           state: false,
//           student: CNE,
//         });
//         newDiplome
//           .save()
//           .then((res) => {
//             mongoose.disconnect();
//             resolve(res);
//           })
//           .catch((err) => {
//             mongoose.disconnect();
//             reject(err);
//           });
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// }

//Get all
function getAll() {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Diplome.find();
      })
      .then((diplomes) => {
        mongoose.disconnect();
        resolve(diplomes);
      })
      .catch((error) => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

//Get one
function getOne(id) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Diplome.findOne({ _id: id });
      })
      .then((diplome) => {
        mongoose.disconnect();
        resolve(diplome);
      })
      .catch((error) => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

//delete one
function deleteOne(id) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Diplome.deleteOne({ _id: id });
      })
      .then((result) => {
        mongoose.disconnect();
        if (result.deletedCount === 1) {
          resolve("Document supprimé avec succès.");
        } else {
          resolve(`Aucun document trouvé avec la référence : ${ref}`);
        }
      })
      .catch((error) => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

function setTitle(id, label) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Diplome.findOneAndUpdate(
          { _id: id },
          { title: label },
          { new: true }
        );
      })
      .then((updatedDiplome) => {
        mongoose.disconnect();
        if (updatedDiplome) {
          resolve("Titre mis à jour avec succès.");
        } else {
          resolve(`Aucun document trouvé avec la référence : ${ref}`);
        }
      })
      .catch((error) => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

function setDateObtained(id, date) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then(() => {
        return Diplome.findOneAndUpdate(
          { _id: id },
          { dateObtained: date },
          { new: true }
        );
      })
      .then((updatedDiplome) => {
        mongoose.disconnect();
        if (updatedDiplome) {
          resolve("Date d'obtention mise à jour avec succès.");
        } else {
          resolve(`Aucun document trouvé avec la référence : ${ref}`);
        }
      })
      .catch((error) => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

// Mise à jour de l'état d'un diplôme à "Terminé"
function setStateDone(id) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(dbUrl, { useNewUrlParser: true })
      .then(() => {
        return Diplome.findOneAndUpdate({ _id: id }, { state: true });
      })
      .then(() => {
        mongoose.disconnect();
        resolve("État du diplôme mis à jour avec succès (Terminé).");
      })
      .catch((error) => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

// Mise à jour de l'état d'un diplôme à "Pas encore terminé"
function setStateNotYet(id) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(dbUrl, { useNewUrlParser: true })
      .then(() => {
        return Diplome.findOneAndUpdate({ _id: id }, { state: false });
      })
      .then(() => {
        mongoose.disconnect();
        resolve("État du diplôme mis à jour avec succès (Pas encore terminé).");
      })
      .catch((error) => {
        mongoose.disconnect();
        reject(error);
      });
  });
}

function getStudentsNoDelivered(idFiliere, year) {
  return new Promise((resolve, reject) => {
    try {
      let query = [
        {
          $lookup: {
            from: "sections",
            localField: "section",
            foreignField: "_id",
            as: "sectionData",
          },
        },
        {
          $unwind: "$sectionData",
        },
        {
          $lookup: {
            from: "filieres",
            localField: "sectionData.filiere",
            foreignField: "_id",
            as: "filiereData",
          },
        },
        {
          $unwind: "$filiereData",
        },
      ];
      if (typeof year == "undefined" || year == "false" || year == "") {
        query.push({
          $match: {
            "filiereData._id": new ObjectId(idFiliere),
          },
        });
      } else {
        query.push({
          $match: {
            "sectionData.year": Number(year),
            "filiereData._id": new ObjectId(idFiliere),
          },
        });
      }
      mongoose.connect(urlDb).then(() => {
        Student.aggregate(query)
          .then((students) => {
            // For each student, perform a separate query to check the evaluations
            const promises = students.map((student) => {
              return Evaluation.find({
                referenceStudent: student.reference,
              }).then((evaluations) => {
                let check = true;

                evaluations.forEach((element) => {
                  if (element.grade < 10) {
                    check = false;
                  }
                });
                if (evaluations.length == 0) {
                  check = false;
                }
                if (check) {
                  return student;
                } else {
                  return null;
                }
              });
            });
            return Promise.all(promises);
          })
          .then((validatedStudents) => {
            // Filter out the null values (students not meeting the condition)
            const filteredStudents = validatedStudents.filter(
              (student) => student !== null
            );
            const promises = filteredStudents.map((student) => {
              return Diplome.find({
                student: student.reference,
                state: true,
              }).then((diplomes) => {
                let check = false;
                if (diplomes.length == 0) {
                  check = true;
                }
                if (check) {
                  return student;
                } else {
                  return null;
                }
              });
            });
            return Promise.all(promises);
          })
          .then((finalList) => {
            const filteredStudents = finalList.filter(
              (student) => student !== null
            );
            mongoose.disconnect();
            resolve(filteredStudents);
          })
          .catch((error) => {
            mongoose.disconnect();
            console.error(error);
            reject(error);
          });
      });
    } catch (error) {
      console.error("An error occurred:", error);
      reject(error);
    }
  });
}

function getStudentsDelivered(idFiliere, year) {
  return new Promise((resolve, reject) => {
    try {
      mongoose.connect(urlDb).then(() => {
        let query = [
          {
            $lookup: {
              from: "students",
              localField: "student",
              foreignField: "reference",
              as: "studentInfos",
            },
          },
          {
            $unwind: "$studentInfos",
          },
          {
            $lookup: {
              from: "sections",
              localField: "studentInfos.section",
              foreignField: "_id",
              as: "sectionInfos",
            },
          },
          {
            $unwind: "$sectionInfos",
          },
          {
            $lookup: {
              from: "filieres",
              localField: "sectionInfos.filiere",
              foreignField: "_id",
              as: "filiereInfos",
            },
          },
          {
            $unwind: "$filiereInfos",
          },
        ];
        if (typeof year == "undefined" || year == "false" || year == "") {
          query.push({
            $match: {
              "filiereInfos._id": new ObjectId(idFiliere),
              state: true,
            },
          });
        } else {
          query.push({
            $match: {
              "sectionInfos.year": Number(year),
              "filiereInfos._id": new ObjectId(idFiliere),
              state: true,
            },
          });
        }
        Diplome.aggregate(query)
          .then((result) => {
            mongoose.disconnect();
            resolve(result);
          })
          .catch((err) => {
            mongoose.disconnect();
            reject(err);
          });
      });
    } catch (error) {
      reject(error);
    }
  });
}

function deliveredMany(students, account) {
  return new Promise((resolve, reject) => {
    if (students.length != 0 && typeof students != "undefined") {
      mongoose
        .connect(urlDb)
        .then(() => {
          const promises = students.map((student) => {
            return addNew(
              student.filiereData.cycle + " " + student.filiereData.title,
              new Date(),
              student.reference
            ).then((result) => {
              return {
                student: student,
                diplome: result,
              };
            });
          });
          return Promise.all(promises);
        })
        .then((diplomes) => {
          const data = diplomes.map((diplome) => {
            let studentInfo = diplome.student;
            let diplomeInfo = diplome.diplome;
            let sectionInfo = diplome.student.sectionData;
            let filiereInfo = diplome.student.filiereData;
            return BlockChain.addDiplome(
              account,
              diplomeInfo._id.toString(),
              studentInfo.firstName + " " + studentInfo.lastName,
              studentInfo.cin,
              studentInfo.reference,
              new Date(studentInfo.birthday).toLocaleDateString("en-US"),
              filiereInfo.title,
              filiereInfo.cycle,
              sectionInfo.title,
              "ENS de Rabat"
            );
          });
          return Promise.all(data);
        })
        .then((result) => {
          console.log("diplomes was add seccussfully");
          mongoose.disconnect();
          resolve("diplomes add");
        })
        .catch((err) => {
          mongoose.disconnect();
          reject("error: " + err);
        });
    }
  });
}

function deliveredOne(account, filiere, reference) {
  return new Promise((resolve, reject) => {
    mongoose.connect(urlDb).then((err) => {
      Student.aggregate([
        {
          $lookup: {
            from: "sections",
            localField: "section",
            foreignField: "_id",
            as: "sectionInfos",
          },
        },
        {
          $unwind: "$sectionInfos",
        },
        {
          $lookup: {
            from: "filieres",
            localField: "sectionInfos.filiere",
            foreignField: "_id",
            as: "filiereInfos",
          },
        },
        {
          $unwind: "$filiereInfos",
        },
        {
          $match: {
            reference: reference,
          },
        },
      ])
        .then((student) => {
          addNew(
            student[0].filiereInfos.cycle + " " + student[0].filiereInfos.title,
            new Date(),
            reference
          ).then((diplomeInfo) => {
            let studentInfo = student[0];
            let filiereInfo = student[0].filiereInfos;
            let sectionInfo = student[0].sectionInfos;
            BlockChain.addDiplome(
              account,
              diplomeInfo._id.toString(),
              studentInfo.firstName + " " + studentInfo.lastName,
              studentInfo.cin,
              studentInfo.reference,
              new Date(studentInfo.birthday).toLocaleDateString("en-US"),
              filiereInfo.title,
              filiereInfo.cycle,
              sectionInfo.title,
              "ENS de Rabat"
            )
              .then((result) => {
                resolve(result);
              })
              .catch((err) => {
                reject(err);
              });
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
}

function getOneByRef(ref) {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(urlDb, { useNewUrlParser: true })
      .then((err) => {
        Diplome.aggregate([
          {
            $lookup: {
              from: "students",
              localField: "student",
              foreignField: "reference",
              as: "studentInfos",
            },
          },
          {
            $unwind: "$studentInfos",
          },
          {
            $lookup: {
              from: "sections",
              localField: "studentInfos.section",
              foreignField: "_id",
              as: "sectionInfos",
            },
          },
          {
            $unwind: "$sectionInfos",
          },
          {
            $lookup: {
              from: "filieres",
              localField: "sectionInfos.filiere",
              foreignField: "_id",
              as: "filiereInfos",
            },
          },
          {
            $unwind: "$filiereInfos",
          },
          {
            $lookup: {
              from: "departements",
              localField: "filiereInfos.departement",
              foreignField: "_id",
              as: "departementInfos",
            },
          },
          {
            $unwind: "$departementInfos",
          },
          {
            $match: {
              student: ref,
              state: true,
            },
          },
        ])
          .then((result) => {
            mongoose.disconnect();
            resolve(result);
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