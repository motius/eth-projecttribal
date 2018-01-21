const Web3 = require('web3')
const solc = require('solc')
const fs = require('fs');

// Connect to a node using the RPC protocol (web3.js)
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// Get the raw contract (read from fs)
const code = fs.readFileSync('../truffle/contracts/FanClub.sol').toString()

// compile the shitty code
const compiledCode = solc.compile(code)

// Extract the Definition of functions
const abiDefinition = JSON.parse(compiledCode.contracts[':FanClub'].interface)
const filename = 'FanClub-AbiDefinition.js'
fs.writeFile('abi/' + filename, JSON.stringify(abiDefinition), 'utf8') // String to harddisk
console.log("Stored ABI in: " + filename)

// Extract the byte code out of the json
const byteCode = compiledCode.contracts[':FanClub'].bytecode

// Unlock the first account
web3.eth.defaultAccount = web3.eth.accounts[0]
web3.personal.unlockAccount(web3.eth.accounts[0], "lorenzo")

// Create the contract from ABI Definitions
const fanClubContract = web3.eth.contract(abiDefinition)

// Create the contract with an admin user (lorenzo)
let deployedContract = fanClubContract.new('FC Bayern',{data: '0x' + byteCode, from: web3.eth.accounts[0], gas: 9000000}, function(error, result){
    if(!error){
        const contractAddress = result.address
        console.log("Contract Address:" + contractAddress)
        web3.personal.lockAccount(web3.eth.accounts[0])
    } else {
        console.log(error)
    }
})