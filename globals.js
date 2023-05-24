const crypto = require("crypto")
const key = "blockChainForAll";
const iv = crypto.randomBytes(16);;
// global.urlDb = "mongodb+srv://mstafamt8:mstafa123@cluster0.7ltwxxt.mongodb.net/?retryWrites=true&w=majority";
global.urlDb = "mongodb://127.0.0.1:27017/test";
global.encrypt= encrypt;
global.decrypt= decrypt;

function encrypt(text) {
    
}
// Decrypting text
function decrypt(text) {
    
}
