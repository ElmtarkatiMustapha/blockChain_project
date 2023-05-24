//admin model
/*attribute: 
-FirsName
-LastName
-reference
-userName
-password
-sexe
-birthday
*/
require("../globals");
const generator= require("generate-password")
const { MongoGridFSChunkError } = require("mongodb");
const mongoose = require("mongoose");
const Professor = require("./professor.model").Professor;
const Student = require("./student.model").Student;

const adminSchema = mongoose.Schema({
    reference: String,
    firstName: String,
    lastName: String,
    userName: String,
    password: String,
    sexe: String,
    birthday: Date,
})

var Admin = mongoose.model("admin", adminSchema);
//export model functions
module.exports = {
    addNew,
    getAll,
    getOne,
    deleteOne,
    setFirsName,
    setLastName,
    setReference,
    setUserName,
    setPassword,
    setSexe,
    setDateNaissance
}

//insert function
function checkUserName(userName) {
    return new Promise((resolve, reject) => {
        mongoose.connect(urlDb, { useNewUrlParser: true }).then((err) => {
            Admin.find({
                userName: userName
            }).then((res) => {
                if (res.length === 0) {
                    Professor.find({
                        userName: userName
                    }).then((res) => {
                        if (res.length === 0) {
                            Student.find({
                                userName:userName
                            }).then((res) => {
                                if (res.length === 0) {
                                    mongoose.disconnect();
                                    resolve(userName);
                                } else {
                                    mongoose.disconnect();
                                    userName += (Math.random() * 10);

                                    checkUserName(userName);
                                }
                            })
                        } else {
                            mongoose.disconnect();
                            userName += (Math.random() * 10);
                            checkUserName(userName);
                        }
                    })
                } else {
                    mongoose.disconnect();
                    userName += (Math.random() * 10);
                    checkUserName(userName);
                }
            })
        })
    })
}
function addNew(fName,lName,ref,sexe,birthday) {
    let userName = fName + "_" + lName;
    let password = generator.generate({
	length: 8,
	numbers: true
});
    mongoose.connect(urlDb, { useNewUrlParser: true }).then((err) => {
        checkUserName(userName).then(newUserName => {
            let newAdmin = new Admin({
                reference: ref,
                firstName: fName,
                lastName: lName,
                userName: newUserName,
                password: password,
                sexe: sexe,
                birthday: birthday,
            })
            newAdmin.save().then((result, err) => {
                mongoose.disconnect();
            })
        })
        
    })
    
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

//update info
function setFirsName(admin,nom) {
    
}
function setLastName(admin,penom) {
    
}
function setReference(admin,ref) {
    
}

function setUserName(admin,userName) {
    
}
function setPassword(admin,password) {
    
}
function setSexe(admin, sexe) {
    
}
function setDateNaissance(admin, date) {
    
}