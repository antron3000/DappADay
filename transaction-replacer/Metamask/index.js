let signer
let utils
let provider

async function initialize(web3) {
  await ethereum.enable()
  utils = ethers.utils

  provider = new ethers.providers.Web3Provider(web3.currentProvider)
  await ethereum.enable()
  let accounts = await provider.listAccounts()
  signer = provider.getSigner(accounts[0])
}

async function send(){

  let nonce =utils.bigNum berify(document.getElementById("nonceInput").value)
  let amount = ethers.utils.parseEther(document.getElementById("amountInput").value)
  let to = document.getElementById("toInput").value.toString()
   let gasPrice = ethers.utils.parseUnits(document.getElementById("gasPriceInput").value,9)


var transaction = {
    nonce: nonce,
    gasPrice: gasPrice,
    to: to,
    value: amount
};

console.log(transaction)
await signer.sendTransaction(transaction)
}
