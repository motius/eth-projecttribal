var FanClub = artifacts.require("FanClub");
var BallotBox = artifacts.require("BallotBox");

module.exports = (deployer) => {
    return deployer
        .deploy(FanClub, 'FC Bayern')
        .then(() => {
            FanClub
                .deployed()
                .then(instance => {
                    FC = instance;
                    console.log('Initialized FanClub contract');
                    console.log('Initializing BallotBox contract');
                    return deployer.deploy(BallotBox, instance.address);
                });
        });
};
