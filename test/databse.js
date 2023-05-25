require("../globals");
const mongoose = require("mongoose");
const Student = require("../models/student.model");
const Professor = require("../models/professor.model").Professor;
const Departement = require("../models/departenemt.model");
const Filiere = require("../models/filiere.model");
const Section = require("../models/section.model");
const Module = require("../models/module.model");
const Diplome = require("../models/diplome.model");
const Evaluation = require("../models/evaluation.model");
const Admin = require("../models/admin.model");
const dbLink = "mongodb://127.0.0.1:27017/test";
let fName = "achraf";
let lName = "kabbou";
let ref = "M2Y6587H";
let sexe = "homme";
let birthday = "02/08/2001";
let section = "TMW2023";
let specialite = "developpement web";
let departement = "informatique";

// mongoose.connect(dbLink, { useNewUrlParser: true }).then((err) => {
//   Professor.find(
//     {
//       reference: "REF534G5",
//     },
//     (err, res) => {
//       console.log("error: ", err);
//       console.log("Result: ", res);
//       mongoose.disconnect();
//     }
//   );
// });

// Diplome.addNew("licence profisionnel en TMW", Date(), "M2Y6587H")
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log("Error: ", err);
//   });

// Evaluation.addNew("646f5b14821348f3216a3804", "M2Y6587H", 15, Date())
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log("Error: ", err);
//   });
// Student.addNew(fName, lName, ref, sexe, birthday, section)
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// const testSchema = mongoose.Schema({
//     name: String,
//     age:Number
// })

// // let User = mongoose.model("user", testSchema);
// const link = "mongodb://127.0.0.1:27017/test"
// require("../globals");
// const Test = mongoose.model("test", testSchema);

// mongoose.connect(link, { useNewUrlParser: true }).then((err) => {
//     console.log("connnected to the database");
//     // mongoose.disconnect();
//     // let newTest = new Test({
//     //     name: "karim"
//     // })
//     // newTest.save().then((res, err) => {
//     //     if (err) {
//     //         console.log("Error: ", err);
//     //     } else {
//     //         console.log("done: ", res);
//     //     }
//     //     mongoose.disconnect();
//     // })
//     Test.findOne({
//         name: "achraf"
//     }).then((res, err) => {
//         res.age = 21;
//         res.save().then((res) => {
//             mongoose.disconnect();
//             console.log("goood");
//         })
//     })
// })

// const  mongodb= require("mongodb").MongoClient;

// // mongodb.connect("mongodb+srv://mstafamt8:mstafa123@cluster0.7ltwxxt.mongodb.net/?retryWrites=true&w=majority").then((err, res) => {
// //     console.log('good job')
// // })
// mongodb.connect("mongodb://localhost:27017/",(error,client)=>{
//     let db = client.db();
//     console.log("good");
//     client.close();
// })

// const message = encrypt("hello mustapha");
// console.log("encrypted: ", message);
// console.log("decrypted: ", decrypt(message));

// const crypto = require("crypto");
// const { ObjectId } = require("mongodb");

// const algorithm = "aes-256-cbc";

// // generate 16 bytes of random data
// const initVector = crypto.randomBytes(16);

// // protected data
// const message = "This is a secret message";

// // secret key generate 32 bytes of random data
// const Securitykey = crypto.randomBytes(32);

// // the cipher function
// const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);

// // encrypt the message
// // input encoding
// // output encoding
// let encryptedData = cipher.update(message, "utf-8", "hex");

// encryptedData += cipher.final("hex");

// console.log("Encrypted message: " + encryptedData);

Admin.getByUserName("amal_elmtarkati")
  .then((res) => {
    console.log("result: ", res);
  })
  .catch((err) => {
    console.log("Error: ", err);
  });
