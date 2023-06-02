const Web3 = require("web3");
const TruffleContract = require("truffle-contract");
const diplomes = require("../assets/jsonContract/Diplomes.json");
const { deploy } = require("@truffle/contract/lib/execute");

module.exports = {
  getDiplomesBySection,
  getDiplomesById,
  getDiplomesByCin,
  getDiplomesByCne,
  getDiplomesByName,
  addDiplome,
};

function blockChainConnect() {
  let web3 = new Web3("HTTP://127.0.0.1:7545");
  let account;
  const diplome = TruffleContract(diplomes);
  diplome.setProvider(web3.currentProvider);
  web3.eth.getAccounts().then((res) => {
    account = res[0];
  });
  return diplome;
}
function getDiplomesBySection(section) {
  return new Promise((resolve, reject) => {
    //connect to the blockChain
    const contract = blockChainConnect();
    //get data
    contract
      .deployed()
      .then((deployedContract) => {
        return deployedContract.searchBySection(section.toUpperCase());
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
function getDiplomesById(id) {
  return new Promise((resolve, reject) => {
    const contract = blockChainConnect();
    contract
      .deployed()
      .then((deployedContract) => {
        return deployedContract.searchByid(id.toUpperCase());
      })
      .then((res) => {
        resolve(Array(res));
      })
      .catch((error) => {
        reject(error);
      });
  });
}
function getDiplomesByCin(cin) {
  return new Promise((resolve, reject) => {
    const contract = blockChainConnect();
    contract
      .deployed()
      .then((deployedContract) => {
        return deployedContract.searchByCin(cin.toUpperCase());
      })
      .then((res) => {
        resolve(Array(res));
      })
      .catch((error) => {
        reject(error);
      });
  });
}
function getDiplomesByCne(cne) {
  return new Promise((resolve, reject) => {
    const contract = blockChainConnect();
    contract
      .deployed()
      .then((deployedContract) => {
        return deployedContract.searchByCne(cne.toUpperCase());
      })
      .then((res) => {
        resolve(Array(res));
      })
      .catch((error) => {
        reject(error);
      });
  });
}
function getDiplomesByName(name) {
  return new Promise((resolve, reject) => {
    const contract = blockChainConnect();
    contract
      .deployed()
      .then((deployedContract) => {
        return deployedContract.searchByName(name.toUpperCase());
      })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function addDiplome(
  account,
  idDiplome,
  name,
  cin,
  cne,
  dateNaiss,
  sector,
  typeDiplome,
  section,
  insti
) {
  return new Promise((resolve, reject) => {
    const contract = blockChainConnect();
    contract
      .deployed()
      .then((deployedContract) => {
        return deployedContract.addDiplome(
          idDiplome.toUpperCase(),
          name.toUpperCase(),
          cin.toUpperCase(),
          cne.toUpperCase(),
          dateNaiss,
          sector,
          typeDiplome,
          section.toUpperCase(),
          insti,
          { from: account }
        );
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}
