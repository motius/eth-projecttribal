web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.1.113:8545"));
abi =
JSON.parse('[{"constant":false,"inputs":[{"name":"_userId","type":"address"}],"name":"makeUserAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getName","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_userId","type":"address"}],"name":"makeFanAUser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newUser","type":"address"}],"name":"addUser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_userId","type":"address"}],"name":"getUser","outputs":[{"name":"","type":"address"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getNumberOfMembers","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_userId","type":"address"}],"name":"makeUserAFan","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_userId","type":"address"}],"name":"makeAdminUser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_name","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]');

fanClubContract = web3.eth.contract(abi);
contractInstance = fanClubContract.at('0x11247e95a07abce6c40e125f55e38e10d4a99d94');

function getNumberOfMembers() {
  console.log(contractInstance);
  console.log(contractInstance.getNumberOfMembers());
}

function getUser() {
  console.log(contractInstance.getUser('0x563983c8a37308d9028e904c22bb7de3794492c2'))
}

function addUser() {
  contractInstance.addUser('0x235b82ab7a5ada95decd149f5ca8a4aade9ca7ed')
}
