const Professor = require("../models/professor.model");
const Student = require("../models/student.model").Student;
const Evaluation = require("../models/evaluation.model").Evaluation;
const Diplome = require("../models/diplome.model").Diplome;
// const Admin = require("../models/admin.model");
const mongoose = require("mongoose");
const { connect } = require("../routes/home.router");
const { ObjectId } = require("mongodb");
const { resolve } = require("@truffle/contract/lib/promievent");
const dbLink = "mongodb://127.0.0.1:27017/test";

let fName = "yassin";
let lName = "el mtarkati";
let ref = "M2Y65";
let sexe = "homme";
let birthday = "02/08/2001";
let section = "TMW2023";
let specialite = "developpement web";
let departement = "informatique";




async function getStudentsWithValidatedEvaluations(idFiliere,year) {
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
        
    ]
    if (typeof year == "undefined") {
      query.push({
          $match: {
            "filiereData._id": new ObjectId(idFiliere),
          },
        })
    } else {
      query.push({
        $match: {
          "sectionData.year": year,
          "filiereData._id": new ObjectId(idFiliere),
        },
      });
    }
    mongoose.connect(dbLink).then(() => {
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
              // const isValidated = evaluations.every((evaluation) => {
              //   evaluation.grade <= 10;
              // });
              if (check) {
                return student;
              } else {
                return null;
              }
            });
          });

          // Wait for all promises to resolve
          return Promise.all(promises);
        })
        .then((validatedStudents) => {
          // Filter out the null values (students not meeting the condition)
          const filteredStudents = validatedStudents.filter(
            (student) => student !== null
          );
          mongoose.disconnect();
          // Process the filtered students
          console.log(filteredStudents);
        })
        .catch((error) => {
          mongoose.disconnect();
          // Handle any potential errors
          console.error(error);
        });
    })
    //mongoose.disconnect();
    // console.log(finalStudents);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

function getStudentsDelivered(idFiliere, year) {
  return new Promise((resolve, reject) => {
    try {
      mongoose.connect(dbLink).then(() => {
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
        if (typeof year == "undefined") {
          query.push({
            $match: {
              "filiereInfos._id": new ObjectId(idFiliere),
              state: true,
            },
          });
        } else {
          query.push({
            $match: {
              "sectionInfos.year": year,
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
  })
}


getStudentsDelivered("646f51f8e2e27b12e41e25cc",2023).then(res => {
  console.log(res);
})

// getStudentsWithValidatedEvaluations("646f51f8e2e27b12e41e25cc");





// mongoose.connect(dbLink, { useNewUrlParser: true }).then((err) => {
//   Professor.find(
//     {
//       reference: "REF534G5",
//     },
//     (err, res) => {
//       console.log("error: ", err);
//       console.log("Result: ", res);
//     }
//   );
// });

// const fs = require("fs");
// const path = require("path");
// const csv = require("fast-csv");

// fs.createReadStream(path.resolve(__dirname, "..", "assets", "testCSV.csv"))
//   .pipe(csv.parse({ headers: true, delimiter: ";" }))
//   .on("error", (error) => console.error(error))
//   .on("data", (row) => console.log(row.name))
//   .on("end", (rowCount) => console.log(`Parsed ${rowCount} rows`));

// .then((res) => {
//       mongoose.disconnect();
//       console.log(res);
//     })
//     .catch((err) => {
//       mongoose.disconnect();
//       console.log(err);
//     });
// Student.addNew(fName, lName, ref, sexe, birthday, section)
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// mongoose.connect(dbLink, { useNewUrlParser: true }).then((err) => {
//   let prof = new Professor({
//     reference: "REF534G5",
//     firstName: "mustapha",
//     lastName: "el mtarkati",
//     userName: "mustapha_elmtarkati",
//     password: "Mstafa123",
//     sexe: "homme",
//     birthday: "02/08/2001",
//     specialty: "developement web",
//   });
//   prof
//     .save()
//     .then((res) => {
//       mongoose.disconnect();
//       console.log(res);
//     })
//     .catch((err) => {
//       mongoose.disconnect();
//       console.log(err);
//     });
// });

// mongoose
//   .connect(urlDb, { useNewUrlParser: true })
//   .then(() => {
//     return Admin.Admin.findOneAndUpdate(
//       { reference: "M23JY243" },
//       { birthday: new Date("08/21/2000") },
//       { new: true }
//     );
//   })
//   .then((updatedAdmin) => {
//     mongoose.disconnect();
//     if (updatedAdmin) {
//       console.log("Date de naissance mise à jour avec succès.");
//     } else {
//       console.log(`Aucun document trouvé avec la référence : `);
//     }
//   })
//   .catch((error) => {
//     mongoose.disconnect();
//     console.log(error);
//   });

// console.log(new Date("10/10/2000"));
