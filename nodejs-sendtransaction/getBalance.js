const { ethers } = require("ethers");

// Use the mainnet
const network = "ropsten";

// Specify your own API keys
// Each is optional, and if you omit it the default
// API key for that service will be used.
const provider = ethers.getDefaultProvider();

let address = "0xFE242365FFd2EBBeAa65d55F91EdE576FEb8A9Fa"

getBalance()
async function getBalance(){
  let balance = await provider.getBalance(address)

  balance = ethers.utils.formatEther(balance)

  console.log(balance)
}
