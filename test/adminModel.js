const Professor = require("../models/professor.model");
const Student = require("../models/student.model");
// const Admin = require("../models/admin.model");
const mongoose = require("mongoose");
const { connect } = require("../routes/home.router");
const dbLink = "mongodb://127.0.0.1:27017/test";

let fName = "yassin";
let lName = "el mtarkati";
let ref = "M2Y65";
let sexe = "homme";
let birthday = "02/08/2001";
let section = "TMW2023";
let specialite = "developpement web";
let departement = "informatique";
mongoose.connect(dbLink, { useNewUrlParser: true }).then((err) => {
  Professor.find(
    {
      reference: "REF534G5",
    },
    (err, res) => {
      console.log("error: ", err);
      console.log("Result: ", res);
    }
  );
});
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
