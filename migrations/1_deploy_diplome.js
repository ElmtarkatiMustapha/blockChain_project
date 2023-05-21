const Diplomes = artifacts.require("Diplomes");

module.exports = function(deployer) {
  deployer.deploy(Diplomes);
};
