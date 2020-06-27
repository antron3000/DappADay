const idABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "add",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "identities",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
const idAddress = '0x5D3F172E873a260E791AEA4D80a2D422581819D3';
let id

let idSigner

let provider
let signer

async function initialize(){
	provider = ethers.getDefaultProvider("ropsten")
	id = new ethers.Contract(idAddress,idABI,provider)
  await populateIDs()

  let owner = await id.owner()

  document.getElementById("ownerLabel").innerHTML = "Owner: "
  let ownerLink = await getAddressLink(owner,owner)
  document.getElementById("ownerLabel").appendChild(ownerLink)

}

async function initializeMetamask(web3) {
	console.log("ID")
	let metamaskProvider = new ethers.providers.Web3Provider(web3.currentProvider)
  await ethereum.enable()
  let accounts = await metamaskProvider.listAccounts()
  signer = metamaskProvider.getSigner(accounts[0])

  idSigner = new ethers.Contract(idAddress,idABI,signer)

}

async function populateIDs(){
  console.log("PopulateIDs")
  let arrayEnd = false
  let i = 0
	while(arrayEnd==false){
  let identity
  try{
   identity = await id.identities(i)
   console.log(i)
   i++
 } catch{
   arrayEnd = true;
   break;
 }
	let row=document.createElement("tr");
	let cell1 = document.createElement("td");
	let cell2 = document.createElement("td");

	let name = await identity.name
	let address = identity._address

	name = document.createTextNode(name)
	address = await getAddressLink(address,address)


			 cell1.appendChild(name);
			 cell2.appendChild(address);

			 row.appendChild(cell1);
			 row.appendChild(cell2);

			 IDTable.appendChild(row);
		 }

}

async function add(){
	let name = document.getElementById("IDName").value
	let address = document.getElementById("IDAddress").value

	await idSigner.add(name,address)
}

async function getAddressLink(displayText, address){
  let link = document.createElement("a")
  link.innerHTML = displayText

  let network = (await signer.provider.getNetwork()).name

  link.href = "https://" + network + ".etherscan.io/address/" + address

  return(link)
}
