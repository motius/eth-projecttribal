var FanClub = artifacts.require("FanClub");

module.exports = function(deployer) {
    deployer.deploy(FanClub, 'FC Bayern');
};