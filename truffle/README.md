# How to test the contract

Currently there is one contract called FanClub which is the user database. \
You need to have nodejs installed. \
Then you need to install truffle (`npm install -g truffle`). Once that is done \
run truffle compile and truffle develop. You will see some dummy accounts \
being created and then enter a command line debugger. There you need to execute \
`migrate` and then you can test that everything worked by running: \
`FanClub.deployed().then(instance => {return instance.getNumberOfMembers.call()}).then(val => {return val.toNumber()});` \
if you need to update the code rerun `truffle compile` and then `migrate --reset` \
debugger console.