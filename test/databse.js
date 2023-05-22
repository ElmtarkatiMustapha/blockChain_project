const mongoose = require("mongoose")

const testSchema = mongoose.Schema({
    name: String,
    age: Number
})

// let User = mongoose.model("user", testSchema);
// const urlDb = "mongodb+srv://mstafamt8:mstafa123@cluster0.7ltwxxt.mongodb.net/?retryWrites=true&w=majority"
require("../globals");
const Test = mongoose.model("test", testSchema);

mongoose.connect(urlDb, { useNewUrlParser: true }).then((err) => {
    console.log("connnected to the database");
    let newTest = new Test({
        name: "mustapha",
        age: 21
    })
    // newTest.save().then((err, res) => {
    //     if (err) {
    //         console.log("Error: ", err);
    //     }
    //     console.log(res);
    // })
        mongoose.disconnect();
})

// const  mongodb= require("mongodb").MongoClient;

// // mongodb.connect("mongodb+srv://mstafamt8:mstafa123@cluster0.7ltwxxt.mongodb.net/?retryWrites=true&w=majority").then((err, res) => {
// //     console.log('good job')
// // })
// mongodb.connect("mongodb://localhost:27017/",(error,client)=>{
//     let db = client.db();
//     console.log("good");
//     client.close();
// })
