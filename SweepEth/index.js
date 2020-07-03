
let mnemonic
let provider
let wallet
let masterNode

const txFee = ethers.utils.parseEther("0.000799")


async function sweep(){
  provider = ethers.getDefaultProvider("ropsten");
  let mnemonic = document.getElementById("seed").value
  let to = document.getElementById("to").value

  masterNode = ethers.utils.HDNode.fromMnemonic(mnemonic);

  for (i=0;i<999;i++){
    let wallet = masterNode.derivePath("m/44'/60'/0'/0/" + i);
    let walletWithProvider = new ethers.Wallet(wallet.privateKey, provider);
    console.log(walletWithProvider)
    let balance = await provider.getBalance(wallet.address)
    if(balance.gte(txFee)){
    let nonce = await walletWithProvider.getTransactionCount()
    var transaction = {
      gasLimit: 21000,
      gasPrice: ethers.utils.parseUnits("38",9),
      nonce: nonce,
      to: to,

      value: balance.sub(txFee),
      data: "0x"

  };

    let signedTx = await walletWithProvider.sign(transaction)

    let tx = await provider.sendTransaction(signedTx)

    console.log(tx)
}
  }
}
