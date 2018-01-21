web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const account = web3.eth.accounts[0]
abi = JSON.parse('[{"constant":false,"inputs":[{"name":"_userId","type":"address"}],"name":"makeUserAdmin","outputs":[{"name":"","type":"uint256"},{"name":"","type":"string"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getNumberOfFans","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getName","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_userId","type":"address"}],"name":"makeFanAUser","outputs":[{"name":"","type":"uint256"},{"name":"","type":"string"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getNumberOfUsers","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_first_name","type":"string"}],"name":"setFirstName","outputs":[{"name":"","type":"uint256"},{"name":"","type":"string"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"_userId","type":"address"}],"name":"getUser","outputs":[{"name":"user_id","type":"address"},{"name":"first_name","type":"string"},{"name":"last_name","type":"string"},{"name":"role","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getNumberOfMembers","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_userId","type":"address"}],"name":"makeUserAFan","outputs":[{"name":"","type":"uint256"},{"name":"","type":"string"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_last_name","type":"string"}],"name":"setLastName","outputs":[{"name":"","type":"uint256"},{"name":"","type":"string"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"newUser","type":"address"},{"name":"first_name","type":"string"},{"name":"last_name","type":"string"}],"name":"addUser","outputs":[{"name":"","type":"uint256"},{"name":"","type":"string"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getNumberOfAdmins","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_userId","type":"address"}],"name":"makeAdminUser","outputs":[{"name":"","type":"uint256"},{"name":"","type":"string"}],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[{"name":"_name","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]');


var contractInstance = web3.eth.contract(abi).at('0x11247e95a07abce6c40e125f55e38e10d4a99d94');
function getNumberOfMembers() {
  console.log(contractInstance.getNumberOfMembers().c[0]);
}

function getUserObject(_userId) {
    return new Promise((resolve, reject) => {
        contractInstance.getUser(_userId, (error, result) => {
            if(error) return reject(error)
            else resolve(result)
        })
    })
}

function getUserRole(){
    getUserObject('0x563983c8a37308d9028e904c22bb7de3794492c2')
    .then((res) => {
        console.log(res[1])
    })
}
function getUser() {
    getUserObject('0x563983c8a37308d9028e904c22bb7de3794492c2')
        .then((res) => {
            console.log(res)
        })
}

function unlockAccount(_userId, password) {
    return new Promise((resolve, reject) => {
        web3.personal.unlockAccount(account, password, (error, result) => {
            if(error) return reject(error)
            console.log("Logged in")
            resolve(result)
        })
    })
}
function addUser(_userId, first_name, last_name) {
    return new Promise((resolve, reject) => {
        contractInstance.addUser(_userId, first_name, last_name, {from: web3.eth.accounts[0], gas:3000000}, (error, result) => {
            if(error) return reject(error)
            console.log("Adding User")
            console.log(result)
            resolve(result)
        })
    })
}
function lockAccount(_userId) {
    return new Promise((resolve, reject) => {
        web3.personal.lockAccount(account, (error, result) => {
            if(error) return reject(error)
            console.log("Logged out")
            resolve(result)
        })
    })
}

//submitProposal(options[]){}

//listProposals()

//vote(id, answerIndex)

function updateWrapper(func){
    unlockAccount(account, 'lorenzo')
    .then((res) => {
        return func()
    }).catch((error) => {
        console.log(error)
    })
    .then((res) => {
        return lockAccount()
    })
}

function addUserWrapper(){
    updateWrapper(() => addUser('0x235b82ab7a5ada95decd149f5ca8a4aade9ca7ed', "Nikolay", "Dimolarov"))
}