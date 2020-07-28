const tutorABI = [
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
				"name": "studentName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "studentAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_hours",
				"type": "uint256"
			}
		],
		"name": "booked",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_hours",
				"type": "uint256"
			}
		],
		"name": "book",
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
		"name": "price",
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
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			}
		],
		"name": "setPrice",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
const tutorAddress = '0xD371D4C1Dd2F785090cf2e2277414c1FD5C22095';
let tutor

const tokenABI = [
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
let token
let tokenAddress = "0xab3A3f3Df683513De7d060a045A01a13b811F422"
let tokenDecimals
let tokenSymbol

let tutorSigner

let provider
let signer

let event_logs



async function initialize(){

	await ethereum.enable()
	provider = new ethers.providers.Web3Provider(web3.currentProvider)
	let accounts = await provider.listAccounts()
	signer = provider.getSigner(accounts[0])

	tutor = new ethers.Contract(tutorAddress,tutorABI,signer)
	token = new ethers.Contract(tokenAddress,tokenABI,signer)

  decimals = await token.decimals()
  symbol = await token.symbol()
	await getPrice()
	await getBalances()


	 await gatherEventLogs()
	 await populateBookings()

}
async function getBalances() {
	await getETHBalance()
	await getTokenBalance()
	await getApprovedTokenBalance()
}


async function populateBookings(){
	for(let n = 0;n<event_logs.length;n++){

	let row=document.createElement("tr");
	let cell1 = document.createElement("td");
	let cell2 = document.createElement("td");
	let cell3 = document.createElement("td");

	let name = event_logs[n].name
	let address = event_logs[n].address
	let hours = event_logs[n].hours

	name = document.createTextNode(name)
	address = document.createTextNode(address)
	hours = document.createTextNode(hours)




			 cell1.appendChild(name);
			 cell2.appendChild(address);
			 cell3.appendChild(hours);



			 row.appendChild(cell1);
			 row.appendChild(cell2);
			 row.appendChild(cell3);


			 bookingsTable.appendChild(row);
		 }

}

async function add(){
	let name = document.getElementById("dappName").value
	let description = document.getElementById("dappDescription").value
	let link = document.getElementById("dappLink").value
	let repository = document.getElementById("dappRepository").value

	await dadSigner.add(name,description,link,repository)
}

//blocks to read events from

let fromBlock = 3100000
let toBlock = 6122719

async function gatherEventLogs(){
	console.log("gather Logs")
	event_logs = new Object()

	let Topic = ethers.utils.id("booked(string,address,uint256)")
	console.log(Topic)
	let Filter = createFilter(Topic)

	let Logs = await provider.getLogs(Filter)
	console.log(Logs)
	let Info = await getBookingInfo(Logs)

	event_logs = Info
}





function createFilter(topic){
  let filter = {
		address: tutorAddress,
		fromBlock: fromBlock,
		toBlock: toBlock,
		topics: [ topic ]
	}
  return(filter)
}

function ArrayifyLogData(logs) {
	let events = new Array()
	for (n=0;n<logs.length;n++){
		let log = new Object()
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
  let provider = ethers.getDefaultProvider("homestead")
  let block = await provider.getBlock(blockNumber)
  return block.timestamp
}

async function getBookingInfo(bookingLogs){
  let bookingHexArray = ArrayifyLogData(bookingLogs)
  let bookingInfo = new Array()

  for (n=0;n<bookingLogs.length;n++){
  		let log = bookingHexArray[n]
			console.log(log)
  		let eventInfo = new Object()

  		eventInfo.name = HexToString(log[4])
			eventInfo.address = HexToAddress(log[1])
  		eventInfo.hours  = HexToInt(log[2],0)
      eventInfo.eventInfo = bookingLogs[n]
  		bookingInfo.push(eventInfo)
  	}
    return(bookingInfo)
}

// function getStringsFromData(log){
// 	let s = 0;
// 	let strings = new Array()
// 	strings.push("")
//
// 	for(let n = 5;n<log.length;n++){
// 		let str = HexToString(log[n])
// 		let test = ethers.utils.hexStripZeros(log[n])
// 		if(test.length<=4){
// 			strings.push("")
// 			s++;
// 		} else{
// 			strings[s] += HexToString(log[n])
// 		}
// 	}
// 	return strings
// }

async function getPrice() {
	let price = await tutor.price();
	price = ethers.utils.formatUnits(price,decimals)
	price = ethers.utils.commify(price)
	document.getElementById("priceLabel").innerHTML = "Price: " + price + " DEV"
}


async function getETHBalance(){
	let balance = await provider.getBalance(signer._address)
	balance = ethers.utils.formatEther(balance)
	balance = ethers.utils.commify(balance)
	balance += " ETH"
	document.getElementById("ETHBalanceLabel").innerHTML = balance
}

async function getTokenBalance(){

  let balance = await token.balanceOf(signer._address)
	balance = ethers.utils.formatUnits(balance,decimals)
	balance = ethers.utils.commify(balance)
	balance += " " + symbol
  document.getElementById("DBalanceLabel").innerHTML = balance
}

async function getApprovedTokenBalance(){
	let balance = await token.allowance(signer._address,tutorAddress)
	balance = ethers.utils.formatUnits(balance,decimals)
	balance = ethers.utils.commify(balance)
	balance += " " + symbol
  document.getElementById("Approved").innerHTML = "Approved: " + balance
}

async function approve(){
  let amount = document.getElementById("ApproveInput").value
	amount = ethers.utils.parseUnits(amount,8)

	token.approve(tutorAddress,amount)
}

async function book() {
	let name = document.getElementById("nameInput").value
	let hours = document.getElementById("hoursInput").value
	await tutor.book(name,hours);
}
