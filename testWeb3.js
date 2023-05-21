const Web3 = require("web3")
const TruffleContract = require("truffle-contract")
let web3 = new Web3("HTTP://127.0.0.1:7545")
web3.eth.getBlockNumber((error, result) => {
  if (!error) {
    console.log(result);
  } else {
    console.error(error);
  }
});
let account;
const diplomes = require("./assets/jsonContract/Diplomes.json");
const diplome =  TruffleContract(diplomes);
diplome.setProvider(web3.currentProvider);
web3.eth.getAccounts().then((res) => {
    account = res[0];
})
diplome.deployed().then((deployedDiplome) => {
  addDiplome(deployedDiplome, "ACHRAF KABBOU", "Z5", "S5", "26/09/2001", "MCW", "BTS", 2022, "BTS de Taza").then((res) => {
    // searchByCin(deployedDiplome, "Z649630");
    // console.log(res);
  })
  // searchByCin(deployedDiplome, "Z1");
  // searchBySession(deployedDiplome, 2023);
    // for (i = 5; i < 9; i++){
    //     deployedDiplome.createTask("hello world "+i, { from: account }).then((res, error) => {
            
    //     })
    // }
    // deployedDiplome.taskCount().then((res) => {
    //     for (i = 1; i <= res.toNumber(); i++){
    //         deployedDiplome.tasks(i).then((res) => {
    //             console.log( res[0]+" "+res[1]);
    //         })
    //     }
    // })
    
    // deployedDiplome.tasks(1).then((res) => {
    //     console.log(res);
    // })
    // console.log(deployedDiplome.taskCount());
})

async function addDiplome(diplomes, name, cin, cne, dateNaiss, sector, typeDiplome, session, insti) {
  try {
    const res = await diplomes.addDiplome(name, cin, cne, dateNaiss, sector, typeDiplome, session, insti, { from: account });
    console.log("done", res);
  } catch (error) {
    console.log("Error ",error.message);
  }
}

function searchByid(diplomes,id) {
  diplomes.searchByid(id.toNumber()).then((res) => {
    console.log(res);
  })
}
function searchByCin(diplomes,cin) {
  diplomes.searchByCin(cin).then((res) => {
    console.log(res);
  })
}
function searchBySession(diplomes,session) {
  diplomes.searchBySession(session).then((res) => {
    console.log(res);
  })
}