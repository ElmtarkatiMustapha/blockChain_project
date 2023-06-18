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
let fName = "mustapha";
let lName = "el mtarkati";
let ref = "M2Y6589G";
let sexe = "homme";
let birthday = "02/08/2001";
let section = "646f5483372afc737e3ae8d1";
let specialite = "developpement web";
let departement = "informatique";

// Section.addNew("TMW2022", 2022, "646f51f8e2e27b12e41e25cc");

// Evaluation.setGrade("M2Y6589G", "646f5b14821348f3216a3804", "10").then(res => {
//   console.log("result: ",res)
// }).catch(err => {
//   console.log("Erorro: ", err);
// })
// const eval = Evaluation.Evaluation;
// let table = [3, 4, 7];
// async function run() {
//   const err=await mongoose.connect(dbLink, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
//   table.forEach(async value => {
//     let result = await eval.updateOne(
//       {
//         referenceModule: "646f5b14821348f3216a3804",
//         referenceStudent: "M2Y6589G",
//       },
//       { $set: { grade: value } }
//     );
//     console.log(result);
//   })
  
//   await mongoose.disconnect();
// }

// // run();





// async function updateGrade(dataArray) {
//   try {
//     await mongoose.connect(dbLink, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("Connected to the database");

//     for (const data of dataArray) {

//       console.log(data.student, data.module, data.grade);
//       const updatedUser = await eval.findOneAndUpdate(
//         {
//           referenceStudent: data.student,
//           referenceModule: data.module,
//         },
//         { $set: { grade: data.grade } },
//         { new: true }
//       );

//       console.log("User updated:", updatedUser);
//     }

//     mongoose.disconnect();
//     console.log("Disconnected from the database");
//   } catch (error) {
//     console.error("An error occurred:", error);
//   }
// }

// // Usage example
// const dataArray = [
//   {
//     student: "M2Y6589G",
//     module: "646f5b14821348f3216a3804",
//     grade: 2 ,
//   },
//   {
//     student: "M2Y6587H",
//     module: "646f5b14821348f3216a3804",
//     grade: 2 ,
//   },
//   // Add more data items as needed
// ];

// // updateUsers(dataArray);


// const userSchema = new mongoose.Schema({
//   _id: {
//     type: String,
//     required: true,
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   age: {
//     type: Number,
//     required: true,
//   },
// });

// const User = mongoose.model("User", userSchema);

// async function insertOrUpdateData(dataArray) {
//   try {
//     await mongoose.connect(dbLink, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("Connected to the database");

//     for (const data of dataArray) {
//       const { userId, name, age } = data;

//       // Check if the user already exists
//       const existingUser = await User.findById(userId);

//       if (existingUser) {
//         // User already exists, update the data
//         existingUser.name = name;
//         existingUser.age = age;
//         await existingUser.save();
//         console.log("User updated:", existingUser);
//       } else {
//         // User doesn't exist, create a new user
//         const newUser = new User({ _id: userId, name, age });
//         await newUser.save();
//         console.log("New user created:", newUser);
//       }
//     }

//     mongoose.disconnect();
//     console.log("Disconnected from the database");
//   } catch (error) {
//     console.error("An error occurred:", error);
//   }
// }

// Usage example
// const dataArray = [
//   { userId: "609f9be1c6b6564c948c5467", name: "John Doe", age: 40 },
//   { userId: "609f9be1c6b6564c948c5468", name: "Jane Smith", age: 45 },
//   // Add more data items as needed
// ];

// insertOrUpdateData(dataArray);






// Module.getStudentsValide("646f5b14821348f3216a3804").then((res) => {
//   console.log(res);
// });

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

// Diplome.addNew("licence profisionnel en TMW", Date(), "M2Y6589G")
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log("Error: ", err);
//   });

Evaluation.addNew("6473b128fded05a0b7cb3e10", "M2Y65", 7, Date())
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

Evaluation.addNew("646f5b14821348f3216a3804", "M2Y65", 7, Date())
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

// Student.addNew(fName, lName, ref, sexe, birthday, section)
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// Departement.addNew(
//   "Histoire et Géographie",
//   "departement de Histoire et Géographie",
//   "fa-solid fa-clock-rotate-left"
// )
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log("Error: ", err);
//   });
// Departement.addNew(
//   "Sciences de l’Education",
//   "departement de Sciences de l’Education",
//   "fa-solid fa-user-graduate"
// )
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log("Error: ", err);
//   });
  
// Departement.addNew(
//   "Sciences de la Terre",
//   "departement de Sciences de la Terre",
//   "fa-solid fa-earth-africa"
// )
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log("Error: ", err);
//   });

// Departement.addNew(
//   "Sciences de la Vie",
//   "departement de Sciences de la Vie",
//   "fa-solid fa-dna"
// )
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log("Error: ", err);
//   });

// Departement.addNew(
//   "Mathématiques",
//   "departement de Mathématiques",
//   "fa-solid fa-infinity"
// )
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log("Error: ", err);
//   });

// Module.addNew("reseau", 1, "REF534G5").then((data) => {
//   console.log(data);
// });

// const modules = Module.Module;
// mongoose.connect(dbLink).then(() => {
//   modules
//     .aggregate([
//       {
//         $lookup: {
//           from: "professors", // Target collection name
//           localField: "professor",
//           foreignField: "reference",
//           as: "joinedData", // Output field for the joined data
//         },
//       },
//     ])
//     .then((result) => {
//       console.log(result[0].joinedData);
//       mongoose.disconnect();
//     })
//     .catch((error) => {
//       mongoose.disconnect();
//       console.log(error);
//     });
// });

// const filiere = Filiere.Filiere;
// mongoose.connect(dbLink).then(() => {
//   filiere
//     .aggregate([
//       {
//         $match: {
//           title: "TMW",
//         },
//       },
//       {
//         $lookup: {
//           from: "departements", // Target collection name
//           localField: "departement",
//           foreignField: "_id",
//           as: "joinData", // Output field for the joined data
//         },
//       },
//       {
//         $group: {
//           _id: "$cycle",
//           filieres: { $push: "$$ROOT" },
//         },
//       },
//     ])
//     .then((res) => {
//       mongoose.disconnect();
//       console.log(res[0].filieres);
//     });
// });

// const adm = Admin.Admin;
// mongoose.connect(dbLink).then(() => {
//   adm
//     .find({
//       reference: "",
//     })
//     .then((data) => {
//       mongoose.disconnect();
//       console.log("RESULT: " + data);
//     })
//     .catch((err) => {
//       mongoose.disconnect();
//       console.log("ERROR: " + err);
//     });
// });
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

// Admin.getByUserName("amal_elmtarkati")
//   .then((res) => {
//     console.log("result: ", res);
//   })
//   .catch((err) => {
//     console.log("Error: ", err);
//   });
