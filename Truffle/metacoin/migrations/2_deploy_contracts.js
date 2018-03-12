const MetaCoin = artifacts.require("MetaCoin.sol");

const ConvertLib = artifacts.require("./ConvertLib.sol");

module.exports = function(deployer) {

    deployer.deploy(ConvertLib);  // lib

    deployer.link(ConvertLib, MetaCoin); // metacoin need use lib func

    deployer.deploy(MetaCoin);
};