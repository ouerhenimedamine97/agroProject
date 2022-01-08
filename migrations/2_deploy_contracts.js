var SimpleStorage = artifacts.require("./StructStorage.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
};
