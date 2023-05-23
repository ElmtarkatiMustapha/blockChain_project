require("../globals")
// const mongoose = require("mongoose")
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

const crypto = require("crypto");

const algorithm = "aes-256-cbc"; 

// generate 16 bytes of random data
const initVector = crypto.randomBytes(16);

// protected data
const message = "This is a secret message";

// secret key generate 32 bytes of random data
const Securitykey = crypto.randomBytes(32);

// the cipher function
const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);

// encrypt the message
// input encoding
// output encoding
let encryptedData = cipher.update(message, "utf-8", "hex");

encryptedData += cipher.final("hex");

console.log("Encrypted message: " + encryptedData);