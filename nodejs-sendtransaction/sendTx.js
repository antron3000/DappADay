const { ethers } = require("ethers");

// Use the mainnet
const network = "ropsten";

// Specify your own API keys
// Each is optional, and if you omit it the default
// API key for that service will be used.
const provider = ethers.getDefaultProvider("ropsten");


let privateKey = ""
let walletWithProvider = new ethers.Wallet(privateKey, provider);

let amount = ethers.utils.parseEther("0.000001")
let to = "0x69e43fDaF4106E88d2D48312BA56A90828ae3728"
let gasPrice = 42000000000

var transaction = {
 gasPrice: gasPrice,
 to: to,
 value: amount
};


sendTransaction()
async function sendTransaction() {
  await walletWithProvider.sendTransaction(transaction)
  console.log(transaction)
}
