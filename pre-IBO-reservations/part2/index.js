let provider
let signer

const pIRABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "hunterAlias",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
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
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "hunterAlias",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "Hunter",
				"type": "address"
			}
		],
		"name": "hunterAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "Hunter",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "redeemed",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "hunterAlias",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "Hunter",
				"type": "address"
			}
		],
		"name": "addHunter",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "aliasBalances",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "hunterAlias",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "awardBounty",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "devcash",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "hunterToAlias",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
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
	},
	{
		"inputs": [],
		"name": "redeem",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
const pIRAddress = "0x496c2f757549E84993AB47c16c1CF423CD33444a"
let pIR

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
const devcashAddress = "0x0f54093364b396461aadf85c015db597aab56203"
let devcash
let decimals
let symbol

async function initialize(web3) {

  await ethereum.enable()
  provider = new ethers.providers.Web3Provider(web3.currentProvider)
  let accounts = await provider.listAccounts()
  signer = provider.getSigner(accounts[0])

  devcash = new ethers.Contract(devcashAddress,devcashABI,signer)
	pIR = new ethers.Contract(pIRAddress,pIRABI,signer)

  decimals = await devcash.decimals()
  symbol = await devcash.symbol()
  await getBalance()
  await getApproved()
	await gatherEventLogs()
	await populateAliasSelect()
	await populateRewardsTable()

}

async function getBalance(){

  let balance = await devcash.balanceOf(signer._address)

	balance = ethers.utils.formatUnits(balance,decimals)
	balance = ethers.utils.commify(balance)
  document.getElementById("balanceLabel").innerHTML = "Balance: " + balance + " " + symbol
}

async function getApproved(){
	let approved = await devcash.allowance(signer._address, pIRAddress)
	approved = ethers.utils.formatUnits(approved,decimals)
	approved = ethers.utils.commify(approved)
	console.log(signer._address)
	console.log(approved)
	document.getElementById("approvedLabel").innerHTML = "Approved: " + approved + " " + symbol

}

async function approve() {
  let amount = document.getElementById("approveAmount").value;
  amount = ethers.utils.parseUnits(amount, decimals)
  await devcash.approve(pIRAddress,amount)
}

async function populateHunterAliasSelect() {

}

let fromBlock = 8465363
let toBlock = 11649016

async function gatherEventLogs(){
	console.log("gather Logs")
	event_logs = new Object()

	let AwardedTopic = ethers.utils.id("awarded(string,string,string,uint256)")
	let RedeemedTopic = ethers.utils.id("redeemed(address,uint256)")
	let HunterAddedTopic = ethers.utils.id("hunterAdded(string,address)")

	let AwardedFilter = createFilter(AwardedTopic)
	let HunterAddedFilter = createFilter(HunterAddedTopic)

	let AwardedLogs = await provider.getLogs(AwardedFilter)
	let HunterAddedLogs = await provider.getLogs(HunterAddedFilter)
	console.log(HunterAddedLogs)

	let AwardedInfo = await getAwardedInfo(AwardedLogs)
	let HunterAddedInfo = await getHunterAddedInfo(HunterAddedLogs)

	console.log(AwardedInfo)



	event_logs.awarded = AwardedInfo
	event_logs.hunterAdded = HunterAddedInfo
}





function createFilter(topic){
  let filter = {
		address: pIRAddress,
		fromBlock: fromBlock,
		toBlock: toBlock,
		topics: [ topic ]
	}
  return(filter)
}

function ArrayifyLogData(logs) {
	let events = new Array()
	for (n=0;n<logs.length;n++){
		let data = logs[n].data
		data = data.substring(2)
		data = data.match(/.{1,64}/g) //divide data from event log into 64 length sections
		for (j=0;j<data.length;j++){
			data[j] = "0x" + data[j]
		}
		events.push(data)
	}
	return(events)
}

function HexToAddress(hex){
	return("0x" + hex.substring(26))
}

function HexToInt(hex,decimals){
	return(ethers.utils.formatUnits(ethers.utils.bigNumberify(hex),decimals))
}

function HexToString(hex) {
	return(web3.toAscii(hex))
}

async function getTimeStamp(blockNumber){
  let block = await provider.getBlock(blockNumber)
  return block.timestamp
}

async function getAwardedInfo(awardedLogs){
  let awardedHexArray = ArrayifyLogData(awardedLogs)
  let awardedInfo = new Array()

  for (n=0;n<awardedLogs.length;n++){
  		let log = awardedHexArray[n]
			//console.log(log)
  		let eventInfo = new Object()

  		eventInfo.alias = HexToString(log[5])
			eventInfo.name = HexToString(log[7])
			eventInfo.description = HexToString(log[9])

			let rewardAmount = log[3]
			rewardAmount = ethers.utils.formatUnits(rewardAmount,decimals)
			rewardAmount = ethers.utils.commify(rewardAmount)
			eventInfo.awardedAmount = rewardAmount

			let timeStamp = await getTimeStamp(awardedLogs[n].blockNumber)
			eventInfo.time = Date(timeStamp*1000)
			eventInfo.txHash = awardedLogs[n].transactionHash
  		awardedInfo.push(eventInfo)
  	}
    return(awardedInfo)
}

async function getHunterAddedInfo(hunterAddedLogs){
  let hunterAddedHexArray = ArrayifyLogData(hunterAddedLogs)
  let hunterAddedInfo = new Array()

  for (m=0;m<hunterAddedLogs.length;m++){
  		let log = hunterAddedHexArray[m]
  		let eventInfo = new Object()

			eventInfo.hunterAddress = HexToAddress(log[1])
			eventInfo.alias = HexToString(log[3])


			let timeStamp = await getTimeStamp(hunterAddedLogs[m].blockNumber)
			eventInfo.time = Date(timeStamp*1000)
			eventInfo.txHash = hunterAddedLogs[m].transactionHash
  		hunterAddedInfo.push(eventInfo)
  	}
    return(hunterAddedInfo)
}

async function award() {
	let hunterAlias = document.getElementById("hunterAlias").value
	let name = document.getElementById("name").value
	let description = document.getElementById("description").value
	let amount = document.getElementById("amount").value
	amount = ethers.utils.parseUnits(amount,decimals)
	await pIR.awardBounty(hunterAlias,name,description,amount);
}
async function addHunter(){
	let aS = document.getElementById("aliasSelect")
	let hunterAlias = aS.options[aS.selectedIndex].text;
	let hunter = document.getElementById("BountyHunterAddress").value

	await pIR.addHunter(hunterAlias,hunter);
}

async function populateAliasSelect() {
	let aliasSelect = document.getElementById("aliasSelect")
	for(u=0;u<event_logs.awarded.length;u++){
		var opt = document.createElement("option");
 		opt.value= u;
 		opt.innerHTML = event_logs.awarded[u].alias; // whatever property it has
		aliasSelect.appendChild(opt);
	}
}

async function populateRewardsTable() {
	let aliases
	for(let j = 0;j<event_logs.hunterAdded.length;j++){
	let alias = event_logs.hunterAdded[j].alias
	let address = event_logs.hunterAdded[j].hunterAddress
	let reserved = await pIR.aliasBalances(alias)

	let row=document.createElement("tr");
	let cell1 = document.createElement("td");
	let cell2 = document.createElement("td");
	let cell3 = document.createElement("td");



	reserved = ethers.utils.formatUnits(reserved,decimals)
	reserved = ethers.utils.commify(reserved) + " " + symbol

	alias = document.createTextNode(alias)
	address = document.createTextNode(address)
	reserved = document.createTextNode(reserved)

			 cell1.appendChild(alias);
			 cell2.appendChild(address);
			 cell3.appendChild(reserved);

			 row.appendChild(cell1);
			 row.appendChild(cell2);
			 row.appendChild(cell3);


			 rewardsTable.appendChild(row);
		 }

}

async function redeem() {

}
