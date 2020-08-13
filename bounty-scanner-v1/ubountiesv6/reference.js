

const awarderABI = [
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "hunter",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "award",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "employer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "hunter",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "awarded",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "devcashAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
const awarderAddress = '0x7DE09eE61Fd4c326098bE7C4C86b80408707DB9b';
let awarder
let provider
let signer

let torusUserInfo

const devcashABI = [
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "_spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "remaining",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "allowed",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "balances",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "bountyHunter",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "bounty",
				"type": "uint256"
			}
		],
		"name": "payBounty",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
const devcashAddress = "0x0fca8Fdb0FB115A33BAadEc6e7A141FFC1bC7d5a"
let devcash
let decimals
let symbol

let eventLogs

async function initialize(web3) {
  await ethereum.enable()
  provider = new ethers.providers.Web3Provider(web3.currentProvider)
  let accounts = await provider.listAccounts()
  signer = provider.getSigner(accounts[0])

  let EthBalance = ethers.utils.formatEther(await signer.getBalance())

	awarder = new ethers.Contract(awarderAddress,awarderABI,signer)
	devcash = new ethers.Contract(devcashAddress,devcashABI,signer)

	decimals = await devcash.decimals()
  symbol = await devcash.symbol()
  await getBalance()
  await getApproved()
	await getAwarded()
	await populateAwarded()
}

async function getBalance(){

  let balance = await devcash.balanceOf(signer._address)

	balance = ethers.utils.formatUnits(balance,decimals)
	balance = ethers.utils.commify(balance)
  document.getElementById("balanceLabel").innerHTML = "Balance: " + balance + " " + symbol
}

async function getApproved(){
	let approved = await devcash.allowance(signer._address, awarderAddress)
	approved = ethers.utils.formatUnits(approved,decimals)
	approved = ethers.utils.commify(approved)
	console.log(signer._address)
	console.log(approved)
	document.getElementById("approvedLabel").innerHTML = "Approved: " + approved + " " + symbol

}

async function approve() {
  let amount = document.getElementById("approveAmount").value;
  amount = ethers.utils.parseUnits(amount, decimals)
  await devcash.approve(awarderAddress,amount)
}

async function award(){
	let hunter = document.getElementById("bountyHunter").value;
	let description = document.getElementById("bountyDescription").value;
	let amount = document.getElementById("bountyAmount").value;
	amount = ethers.utils.parseUnits(amount, decimals)
	await awarder.award(description,hunter,amount)
}

async function getAwarded() {
	console.log("get Event Logs")
	let topic = ethers.utils.id("awarded(address,address,string,uint256)");
	let filter = {
    address: "0x7DE09eE61Fd4c326098bE7C4C86b80408707DB9b",
    fromBlock: 10000000,
    toBlock: 11111111,
    topics: [ topic ]
	}

	let result = await provider.getLogs(filter)
	eventLogs = new Array()
	for (n=0;n<result.length;n++){
		let log = new Object()
		let data = result[n].data
		data = data.substring(2)
		data = data.match(/.{1,64}/g)
		for (j=0;j<6;j++){
			data[j] = "0x" + data[j]
		}
		let descriptionData = ""
		for (j=5;j<data.length;j++){
			descriptionData += data[j]
		}
		let poster = "0x" + data[0].substring(26)
		let hunter = "0x" + data[1].substring(26)
		let amount = ethers.utils.formatUnits(ethers.utils.bigNumberify(data[3]),8)
		let description = web3.toAscii(descriptionData)
		log.poster = poster
		log.hunter = hunter
		log.amount = amount
		log.description = description
		log.txHash = result[n].transactionHash
		eventLogs.push(log)
	}
}

async function populateAwarded() {
	for(let n=0;n<eventLogs.length;n++){
		let log = eventLogs[n]
		let row=document.createElement("tr");
		cell1 = document.createElement("a");
		cell2 = document.createElement("td");
		cell3 = document.createElement("a");
		cell4 = document.createElement("td");

		let poster = log.poster
		let hunter = log.hunter
		let amount = log.amount + " " + symbol
		let description = log.description

		cell1.innerHTML = poster + ""
		cell1.href = "https://etherscan.io/address/" + poster
		cell2.innerHTML = hunter + ""
		cell2.href = "https://etherscan.io/address/" + hunter
		textnode2=document.createTextNode(hunter);
		cell3.innerHTML = amount
		cell3.href = "https://etherscan.io/tx/" + log.txHash
		textnode4=document.createTextNode(description)

		cell4.appendChild(textnode4);

		row.appendChild(cell1);
		row.appendChild(cell2);
		row.appendChild(cell3);
		row.appendChild(cell4);

		document.getElementById("BATable").appendChild(row);
	}
}
