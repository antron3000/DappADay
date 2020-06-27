const dadABI = [
	{
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
				"internalType": "string",
				"name": "link",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "repository",
				"type": "string"
			}
		],
		"name": "add",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
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
				"internalType": "string",
				"name": "link",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "repository",
				"type": "string"
			}
		],
		"name": "dappAdded",
		"type": "event"
	}
]
const dadAddress = '0x7152E2dC9Bf410C7B53dDa5341DD219cB1b14732';
let dad

let dadSigner

let provider
let signer

let event_logs

let months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "November", "December"]

async function initialize(){
	provider = ethers.getDefaultProvider("homestead")
	dad = new ethers.Contract(dadAddress,dadABI,provider)

	await gatherEventLogs()
	await populateDapps()

}

async function initializeMetamask(web3) {
	console.log("DAD")
	let metamaskProvider = new ethers.providers.Web3Provider(web3.currentProvider)
  await ethereum.enable()
  let accounts = await metamaskProvider.listAccounts()
  signer = metamaskProvider.getSigner(accounts[0])

  dadSigner = new ethers.Contract(dadAddress,dadABI,signer)

}

async function populateDapps(){
	for(let n = 0;n<event_logs.length;n++){


	let row=document.createElement("tr");
	let cell1 = document.createElement("td");
	let cell2 = document.createElement("td");
	let cell3 = document.createElement("td");
	let cell4 = document.createElement("td");
	let cell5 = document.createElement("td")

	let name = event_logs[n].name
	let description = event_logs[n].description
	let date = new Date(event_logs[n].timestamp*1000)

var monthNo = date.getUTCMonth(); //months from 1-12
var day = date.getUTCDate();
var year = date.getUTCFullYear();

let month = months[monthNo]

newdate = day + " " + month + " " + year;

	name = document.createTextNode(name)
	description = document.createTextNode(description)
	date = document.createTextNode(newdate)

	let link = document.createElement("a")

	link.innerHTML = "dApp Link"
	link.href = event_logs[n].link

	let repository = document.createElement("a")

	repository.innerHTML = "Repository"
	repository.href = event_logs[n].repository

			 cell1.appendChild(name);
			 cell2.appendChild(description);
			 cell3.appendChild(link);
			 cell4.appendChild(repository);
			 cell5.appendChild(date)


			 row.appendChild(cell1);
			 row.appendChild(cell2);
			 row.appendChild(cell3);
			 row.appendChild(cell4);
			 row.appendChild(cell5);



			 DADTable.appendChild(row);
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

let fromBlock = 10345600//7990783
let toBlock = 14345600

async function gatherEventLogs(){
	console.log("gather Logs")
	event_logs = new Object()

	let Topic = ethers.utils.id("dappAdded(string,string,string,string)")

	let Filter = createFilter(Topic)

	let Logs = await provider.getLogs(Filter)

	let Info = await getDADInfo(Logs)

	event_logs = Info
}


function createFilter(topic){
  let filter = {
		address: dadAddress,
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

async function getNonce(txHash){
  let provider = ethers.getDefaultProvider("homestead")
  let tx = await provider.getTransaction(txHash)
  return(tx.nonce)
}

async function getDADInfo(dadLogs){
  let dadHexArray = ArrayifyLogData(dadLogs)
  let dadInfo = new Array()

  for (n=0;n<dadLogs.length;n++){
  		let log = dadHexArray[n]
			console.log(log)
  		let eventInfo = new Object()
			let strings = getStringsFromData(log)
			console.log(strings)
  		eventInfo.name = strings[0]
			eventInfo.description = strings[1]
  		eventInfo.link  = strings[2]
			eventInfo.repository = strings[3]
      eventInfo.eventInfo = dadLogs[n]
      eventInfo.timestamp = await getTimeStamp(dadLogs[n].blockNumber)
      eventInfo.nonce = await getNonce(dadLogs[n].transactionHash)
  		dadInfo.push(eventInfo)
  	}
    return(dadInfo)
}

function getStringsFromData(log){
	let s = 0;
	let strings = new Array()
	strings.push("")

	for(let n = 5;n<log.length;n++){
		let str = HexToString(log[n])
		let test = ethers.utils.hexStripZeros(log[n])
		if(test.length<=4){
			strings.push("")
			s++;
		} else{
			strings[s] += HexToString(log[n])
		}
	}
	return strings
}
