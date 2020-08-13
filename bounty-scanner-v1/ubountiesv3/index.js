
let provider

let devcashAddress = "0x0fca8Fdb0FB115A33BAadEc6e7A141FFC1bC7d5a"
let devcashABI = [
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
let devcash

//testCash Faucet
let ubcAddress = "0x7A5BEf5a5deF90f496c9859A993765Ae4D5BcE33"
let ubcABI = [
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
				"indexed": false,
				"internalType": "uint256",
				"name": "uBountyIndex",
				"type": "uint256"
			}
		],
		"name": "created",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "uBountyIndex",
				"type": "uint256"
			}
		],
		"name": "reclaimed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "uBountyIndex",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "submissionIndex",
				"type": "uint256"
			}
		],
		"name": "rewarded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "uBountyIndex",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "submissionIndex",
				"type": "uint256"
			}
		],
		"name": "submitted",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "admin",
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
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "arbitratorList",
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
		"name": "arbitrators",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
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
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "bCList",
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
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "ubountyIndex",
				"type": "uint256"
			}
		],
		"name": "bountyAmount",
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
		"inputs": [],
		"name": "createBountyChest",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
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
				"internalType": "uint8",
				"name": "numLeft",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint48",
				"name": "deadline",
				"type": "uint48"
			}
		],
		"name": "createMultiBounty",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
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
				"internalType": "address",
				"name": "hunter",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint48",
				"name": "deadline",
				"type": "uint48"
			}
		],
		"name": "createSingleBounty",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint8",
				"name": "numLeft",
				"type": "uint8"
			},
			{
				"internalType": "bytes32",
				"name": "infoHash",
				"type": "bytes32"
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
			},
			{
				"internalType": "uint48",
				"name": "deadline",
				"type": "uint48"
			}
		],
		"name": "createUbounty",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "creatorList",
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
		"name": "creators",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "devcash",
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
	},
	{
		"constant": true,
		"inputs": [],
		"name": "fee",
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "freeBC",
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "ubountyIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "submissionIndex",
				"type": "uint256"
			}
		],
		"name": "getSubmissionHash",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
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
				"internalType": "uint256",
				"name": "ubountyIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "submissionIndex",
				"type": "uint256"
			}
		],
		"name": "getSubmissionString",
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "ubountyIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "submissionIndex",
				"type": "uint256"
			}
		],
		"name": "getSubmitter",
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "hunterList",
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
		"name": "hunters",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "numArbitrators",
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
		"name": "numBC",
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
		"name": "numCreators",
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
		"name": "numHunters",
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
		"name": "numUbounties",
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
				"internalType": "uint256",
				"name": "ubountyIndex",
				"type": "uint256"
			}
		],
		"name": "reclaim",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "ubountyIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "submissionIndex",
				"type": "uint256"
			}
		],
		"name": "reward",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_fee",
				"type": "uint256"
			}
		],
		"name": "setFee",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "ubountyIndex",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "submissionHash",
				"type": "bytes32"
			}
		],
		"name": "submitHash",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "ubountyIndex",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "submissionString",
				"type": "string"
			}
		],
		"name": "submitString",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "ubounties",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "numLeft",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "numSubmissions",
				"type": "uint8"
			},
			{
				"internalType": "uint32",
				"name": "hunterIndex",
				"type": "uint32"
			},
			{
				"internalType": "uint32",
				"name": "creatorIndex",
				"type": "uint32"
			},
			{
				"internalType": "uint32",
				"name": "bountyChestIndex",
				"type": "uint32"
			},
			{
				"internalType": "uint48",
				"name": "deadline",
				"type": "uint48"
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
				"internalType": "bytes32",
				"name": "infoHash",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
let ubc

let symbol
let decimals

let event_logs

let ubountyInfo


async function initialize(){

	provider = new ethers.getDefaultProvider("mainnet")

  devcash = new ethers.Contract(devcashAddress,devcashABI,provider)
  symbol = await devcash.symbol()
  decimals = await devcash.decimals()
  ubc = new ethers.Contract(ubcAddress,ubcABI,provider)

	document.getElementById("contract").innerHTML = ubcAddress
	document.getElementById("contract").href = "https://etherscan.io/address/" + ubcAddress

  await gatherEventLogs()
	await populateRewards()
	await displayTotalRewarded()
}



let fromBlock = 8222022
let toBlock = 10640381

async function gatherEventLogs(){
	console.log("gather Logs")
	event_logs = new Object()

	let Topic = ethers.utils.id("rewarded(uint256,uint256)")
	let Filter = createFilter(Topic)

	let Logs = await provider.getLogs(Filter)
	console.log(Logs)
	let Info = await getRewardInfo(Logs)

	event_logs = Info
}





function createFilter(topic){
  let filter = {
		address: ubcAddress,
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

async function getRewardInfo(rewardLogs){
  let rewardHexArray = ArrayifyLogData(rewardLogs)
  let rewardInfo = new Array()

  for (n=0;n<rewardLogs.length;n++){
  		let log = rewardHexArray[n]
			console.log(log)
  		let eventInfo = new Object()

  		eventInfo.uBountyIndex = HexToInt(log[0],0)
			eventInfo.submissionIndex = HexToInt(log[1],0)

			let reward
			eventInfo.rewardAmount = await getRewardAmount(rewardLogs[n])
			let timeStamp = await getTimeStamp(rewardLogs[n].blockNumber)
			eventInfo.time = Date(timeStamp*1000)
			eventInfo.txHash = rewardLogs[n].transactionHash
  		rewardInfo.push(eventInfo)
  	}
    return(rewardInfo)
}



async function getRewardAmount(log){
	let txHash = log.transactionHash;
	let blockNumber = log.blockNumber
	let Topic = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
	let Filter = createTransferFilter(Topic,blockNumber)
	let Logs = await provider.getLogs(Filter)
	let rewardAmount
	for(let n=0;n<Logs.length;n++){
		if(Logs[n].transactionHash == txHash){
			rewardAmount = HexToInt(Logs[n].data,decimals)
		}
	}
	console.log(rewardAmount)
	return(rewardAmount)
}

function createTransferFilter(topic,blockNumber){
  let filter = {
		address: devcashAddress,
		fromBlock: blockNumber,
		toBlock: blockNumber,
		topics: [ topic ]
	}
  return(filter)
}

async function populateRewards(){
	let rewardTable = document.getElementById("rewardTable")
	for(let n = 0;n<event_logs.length;n++){

		let u = await ubc.ubounties(parseInt(event_logs[n].uBountyIndex))
		let s = await ubc.getSubmitter(parseInt(event_logs[n].uBountyIndex),parseInt(event_logs[n].submissionIndex))

		let bountyName = u.name
		let bountyHunter = await ubc.hunterList(s);
		let rewardAmount = event_logs[n].rewardAmount
		rewardAmount = ethers.utils.commify(rewardAmount)
		rewardAmount += " DEV"
		let time = event_logs[n].time

		let row=document.createElement("tr");
		let cell1 = document.createElement("td");
		let cell2 = document.createElement("td");
		let cell3 = document.createElement("a");
		let cell4 = document.createElement("td");

		bountyName = document.createTextNode(bountyName)
		bountyHunter = document.createTextNode(bountyHunter)
		time = document.createTextNode(time)

			 cell1.appendChild(bountyName);
			 cell2.appendChild(bountyHunter);
			 cell3.innerHTML = rewardAmount
			 cell3.href = "https://etherscan.io/tx/" + event_logs[n].txHash
			 cell4.appendChild(time);

			 row.appendChild(cell1);
			 row.appendChild(cell2);
			 row.appendChild(cell3);
			 row.appendChild(cell4);

			 rewardTable.appendChild(row);
		 }
}

async function displayTotalRewarded() {

	let total = ethers.utils.parseUnits("0",0)
	for(let n = 0;n<event_logs.length;n++){
		let hunterIndex = await ubc.getSubmitter(parseInt(event_logs[n].uBountyIndex),parseInt(event_logs[n].submissionIndex))
		if(hunterIndex!=0){
			let rA = ethers.utils.parseUnits(event_logs[n].rewardAmount,decimals)
			total = total.add(rA)
		}
	}

	total = ethers.utils.formatUnits(total, decimals)
	total = ethers.utils.commify(total)
	document.getElementById("total").innerHTML = "Total Rewarded: " + total + " DEV"
}
