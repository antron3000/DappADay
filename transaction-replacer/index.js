let signer
let utils

async function initialize(web3) {
  utils = ethers.utils
}

async function send(){
   let privateKey = document.getElementById("privKeyInput").value
  let provider = ethers.getDefaultProvider();
   let walletWithProvider = new ethers.Wallet(privateKey, provider);

  let nonce =utils.bigNumberify(document.getElementById("nonceInput").value)
  let amount = ethers.utils.parseEther(document.getElementById("amountInput").value)
  let to = document.getElementById("toInput").value.toString()
   let gasPrice = ethers.utils.parseUnits(document.getElementById("gasPriceInput").value,9)
   console.log(nonce,amount,to,gasPrice)
   console.log(walletWithProvider)

var transaction = {
    nonce: nonce,
    gasPrice: gasPrice,
    to: to,
    value: amount
};

console.log(transaction)
await walletWithProvider.sendTransaction(transaction)
}
