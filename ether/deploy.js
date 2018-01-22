const Web3 = require('web3')
const solc = require('solc')
const fs = require('fs');

// Connect to a node using the RPC protocol (web3.js)
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
const filenameFanClub = 'FanClub'
const filenameBallotBox = 'BallotBox'
// Get the raw contract (read from fs)
const codeFanClub = fs.readFileSync('../truffle/contracts/FanClub.sol').toString()
const codeBallotBox = fs.readFileSync('../truffle/contracts/' + filenameBallotBox +  '.sol').toString()
const strippedBallotBox = codeBallotBox.split('\n').splice(4).join('\n')

const code = codeBallotBox
// compile the shitty code
const compiledCode = solc.compile(code)
console.log(compiledCode)
// Extract the Definition of functions
const abiDefinitionFanClub = JSON.parse(compiledCode.contracts[':FanClub'].interface)
const abiDefinitionBallotBox = JSON.parse(compiledCode.contracts[':BallotBox'].interface)

fs.writeFile('abi/' + filenameFanClub + '-AbiDefinition.js', JSON.stringify(abiDefinitionFanClub), 'utf8') // String to harddisk
fs.writeFile('abi/' + filenameBallotBox + '-AbiDefinition.js', JSON.stringify(abiDefinitionBallotBox), 'utf8') // String to harddisk

// Extract the byte code out of the json
const byteCodeFanClub = compiledCode.contracts[':FanClub'].bytecode
const byteCodeBallotBox = compiledCode.contracts[':BallotBox'].bytecode

// Unlock the first account
web3.eth.defaultAccount = web3.eth.accounts[0]
web3.personal.unlockAccount(web3.eth.accounts[0], "lorenzo")

// Create the contract from ABI Definitions
const fanClubContract = web3.eth.contract(abiDefinitionFanClub)
const ballotBoxContract = web3.eth.contract(abiDefinitionBallotBox)

// Create the contract with an admin user (lorenzo)
fanClubContract.new('FC Bayern',{data: '0x' + byteCodeFanClub, from: web3.eth.accounts[0], gas: 9000000}, function(error, result){
    if(!error && result.address != undefined){
        console.log("Contract Address for " + filenameFanClub + ":" + result.address)
        ballotBoxContract.new(result.address, {data: '0x' + byteCodeBallotBox, from: web3.eth.accounts[0], gas: 9000000}, function(error, result){
            if(!error && result.address != undefined){
                console.log("Contract Address for " + filenameBallotBox + ":" + result.address)
                web3.personal.lockAccount(web3.eth.accounts[0])
            } else {
                console.log(error)
            }
        })
    } else {
        console.log(error)
    }
})