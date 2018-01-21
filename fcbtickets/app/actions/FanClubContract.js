'use strict';
const Web3 = require('web3');

const abi = JSON.parse('[{"constant":false,"inputs":[{"name":"_userId","type":"address"}],"name":"makeUserAdmin","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getNumberOfFans","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getName","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_userId","type":"address"}],"name":"makeFanAUser","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getNumberOfUsers","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_first_name","type":"string"}],"name":"setFirstName","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"_userId","type":"address"}],"name":"getUser","outputs":[{"name":"user_id","type":"address"},{"name":"first_name","type":"string"},{"name":"last_name","type":"string"},{"name":"role","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getNumberOfMembers","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_userId","type":"address"}],"name":"makeUserAFan","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_last_name","type":"string"}],"name":"setLastName","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"newUser","type":"address"},{"name":"first_name","type":"string"},{"name":"last_name","type":"string"}],"name":"addUser","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getNumberOfAdmins","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_userId","type":"address"}],"name":"makeFanAdmin","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_userId","type":"address"}],"name":"makeAdminUser","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[{"name":"_name","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"status_code","type":"uint256"},{"indexed":false,"name":"msg","type":"string"}],"name":"RESTishResult","type":"event"}]');
// Connect to the RPC Service
const web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.1.113:8545"));

// Set the account for billing
// const account = web3.eth.accounts[0];
const account = "0x563983c8a37308d9028e904c22bb7de3794492c2";
const password = 'lorenzo';

// Get the contract from the blockchain
var contractInstance = web3.eth.contract(abi).at('0x11247e95a07abce6c40e125f55e38e10d4a99d94');

function updateWrapper(func){
    unlockAccount(account, password)
    .then((res) => {
        return func()
    }).catch((error) => {
        console.log(error)
    })
    .then((res) => {
        return lockAccount()
    })
}

// function getFriends(silent=false) : void {
//   return async function (dispatch: (action : Action) => any, getState: () => Object){
//     // TODO dispatch fetchingFriendsInProgress
//     try {
//       const response = await yourAsyncFunction()
//       const body = response.data;
//       dispatch({type: type.getFriends, value: body});
//     }catch(err) {
//       console.log(err);
//     }
//     finally{
//       // TODO: dispatch fetchingFriendsInProgress
//     }
//   };
// }

export function getUserObject(_userId) {
    return new Promise((resolve, reject) => {
        contractInstance.getUser(_userId, (error, result) => {
            if(error) {
                return reject(error);
            }
            else resolve(result)
        })
    })
}
function extractUserInformation(userId, index){
    getUserObject(userId)
    .then((res) => {
        console.log(res[index])
    })
}
function getUserRole(userId){
    extractUserInformation(userId, 3)
}
function getFistName(userId){
    extractUserInformation(userId, 1)
}
function getLastName(userId){
    extractUserInformation(userId, 2)
}

function getUser(userId) {
    getUserObject(userId)
    .then((res) => {
        console.log(res)
    })
}

function unlockAccount(_userId, password) {
    return new Promise((resolve, reject) => {
        web3.personal.unlockAccount(account, password, (error, result) => {
            if(error) return reject(error)
            resolve(result)
        })
    })
}
function lockAccount(_userId) {
    return new Promise((resolve, reject) => {
        web3.personal.lockAccount(account, (error, result) => {
            if(error) return reject(error)
            resolve(result)
        })
    })
}
function addUser(_userId, first_name, last_name) {
    return new Promise((resolve, reject) => {
        contractInstance.addUser(_userId, first_name, last_name, {from: account, gas:3000000}, (error, result) => {
            if(error) return reject(error)
            resolve(result)
        })
    })
}
function setFirstName(firstName){
    return new Promise((resolve, reject) => {
        contractInstance.setFirstName(firstName, {from: account, gas:3000000}, (error, result) => {
            if(error) return reject(error)
            resolve(result)
        })
    })
}
function setLastName(lastName){
    return new Promise((resolve, reject) => {
        contractInstance.setLastName(lastName, {from: account, gas:3000000}, (error, result) => {
            if(error) return reject(error)
            resolve(result)
        })
    })
}
function makeUserAFan(userId){
    return new Promise((resolve, reject) => {
        contractInstance.makeUserAFan(userId, {from: account, gas:3000000}, (error, result) => {
            if(error) return reject(error)
            resolve(result)
        })
    })
}
function makeUserAdmin(userId){
    return new Promise((resolve, reject) => {
        contractInstance.makeUserAdmin(userId, {from: account, gas:3000000}, (error, result) => {
            if(error) return reject(error)
            resolve(result)
        })
    })
}
function makeAdminUser(userId){
    return new Promise((resolve, reject) => {
        contractInstance.makeAdminUser(userId, {from: account, gas:3000000}, (error, result) => {
            if(error) return reject(error)
            resolve(result)
        })
    })
}
function makeFanAUser(userId){
    return new Promise((resolve, reject) => {
        contractInstance.makeFanAUser(userId, {from: account, gas:3000000}, (error, result) => {
            if(error) return reject(error)
            console.log("Adding User")
            console.log(result)
            resolve(result)
        })
    })
}
function getName(){
    return new Promise((resolve, reject) => {
        contractInstance.getName((error, result) => {
            if(error) return reject(error)
            resolve(result)
        })
    })
}
function getNumberOfUsers(){
    return new Promise((resolve, reject) => {
        contractInstance.getNumberOfUsers((error, result) => {
            resolve(result.c[0])
            if(error) return reject(error)
        })
    })
}
function getNumberOfFans(){
    return new Promise((resolve, reject) => {
        contractInstance.getNumberOfFans((error, result) => {
            if(error) return reject(error)
            resolve(result.c[0])
        })
    })
}
function getNumberOfMembers(){
    return new Promise((resolve, reject) => {
        contractInstance.getNumberOfMembers((error, result) => {
            if(error) return reject(error)
            resolve(result.c[0])
        })
    })
}
function getNumberOfAdmins(){
    return new Promise((resolve, reject) => {
        contractInstance.getNumberOfAdmins((error, result) => {
            if(error) return reject(error)
            resolve(result)
        })
    })
}

function addUserWrapper(){
    updateWrapper(() => addUser('0x235b82ab7a5ada95decd149f5ca8a4aade9ca7ed', "Nikolay", "Dimolarov"))
}
function getMembers(){
    getNumberOfMembers().then((res) => console.log(res))
}

// export default {
//   //facebookRegister,
//   getUserObject,
// };