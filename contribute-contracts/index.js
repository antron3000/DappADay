let provider
let mProvider
let mSigner

let v1ABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "contributor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "contribution",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
]
let v2ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
]



let parentAddress = "0x1FB3D756ac8BEd3358CFF255E1457FEB8937125b"
let parentABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "contributor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "contributionContract",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "contribution",
		"type": "event"
	},
	{
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"inputs": [],
		"name": "deployv1",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "deployv2",
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
		"name": "v1s",
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
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "v2s",
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
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

let parent
let v1s
let v2s

let mParent

let logs

async function initialize() {

  provider = ethers.getDefaultProvider("homestead")
  parent = new ethers.Contract(parentAddress,parentABI,provider)

  await getV1s()
  await getV2s()

  await gatherLogs()

  await populateSelects()

  await displayv1()
  await displayv2()

  await ethereum.enable()
  mProvider = new ethers.providers.Web3Provider(web3.currentProvider)
  let accounts = await mProvider.listAccounts()
  mSigner = mProvider.getSigner(accounts[0])

  mParent = new ethers.Contract(parentAddress,parentABI,mSigner)



}

async function getV1s(){
  console.log("getV1s")
  let End = false
  let n = 0;
  v1s = new Array()
  do{
    try{
      let v1Address = await parent.v1s(n++)
      let v1 = new ethers.Contract(v1Address,v1ABI,provider)
      v1s.push(v1)
    } catch {
      End = true
    }
  } while(End==false)
}

async function getV2s(){
  console.log("getV2s")
  let End = false
  let n = 0;
  v2s = new Array()
  do{
    try{
      let v2Address = await parent.v2s(n++)
      let v2 = new ethers.Contract(v2Address,v2ABI,provider)
      v2s.push(v2)
    } catch {
      End = true
    }
  } while(End==false)
}

async function deployv1(){
  await mParent.deployv1()
}

async function deployv2(){
  await mParent.deployv2()
}

async function populateSelects() {
  console.log("populate v1 Select")
  for (let j = 0; j<v1s.length;j++){
    var opt = document.createElement("option");
     opt.value= j;
     opt.innerHTML = j;
     document.getElementById("v1Select").appendChild(opt);
   }
   console.log("populate v2 Select")
   for (let j = 0; j<v2s.length;j++){
     var opt = document.createElement("option");
      opt.value= j;
      opt.innerHTML = j;
      document.getElementById("v2Select").appendChild(opt);
    }
}

async function displayv1() {
  let selectedIndex = document.getElementById("v1Select").selectedIndex
  document.getElementById("v1QR").src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + v1s[selectedIndex].address
  document.getElementById("v1AddressLabel").innerHTML = v1s[selectedIndex].address
  document.getElementById("v1AddressLabel").href = "https://etherscan.io/address/" +  v1s[selectedIndex].address
  await populateContributionsv1()

}

async function displayv2(){
  let selectedIndex = document.getElementById("v2Select").selectedIndex
  document.getElementById("v2QR").src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + v2s[selectedIndex].address
  document.getElementById("v2AddressLabel").innerHTML = v2s[selectedIndex].address
  document.getElementById("v2AddressLabel").href = "https://etherscan.io/address/" +  v2s[selectedIndex].address

   await populateContributionsv2()
}

async function populateContributionsv1(){
  v1Table.innerHTML = ""

  let selectedIndex = document.getElementById("v1Select").selectedIndex

  let contributions = logs.v1[selectedIndex]
  for(let n = 0;n<contributions.length;n++){

  let row=document.createElement("tr");
  let cell1 = document.createElement("td");
  let cell2 = document.createElement("td");

  let contributor = contributions[n].contributor
  let contribution = contributions[n].contribution

  contributor = document.createTextNode(contributor)
  contribution = document.createTextNode(contribution)

       cell1.appendChild(contributor);
       cell2.appendChild(contribution);

       row.appendChild(cell1);
       row.appendChild(cell2);

       v1Table.appendChild(row);
     }

}

async function populateContributionsv2(){
  v2Table.innerHTML = ""

  let selectedIndex = document.getElementById("v2Select").selectedIndex

  let contributions = logs.v2
  for(let n = 0;n<contributions.length;n++){

  let row=document.createElement("tr");
  let cell1 = document.createElement("td");
  let cell2 = document.createElement("td");
  let cell3 = document.createElement("td");


  let contributor = contributions[n].contributor
  let contributionContract = contributions[n].contributionContract
  let contribution = contributions[n].contribution

  contributor = document.createTextNode(contributor)
  contributionContract = document.createTextNode(contributionContract)
  contribution = document.createTextNode(contribution)

       cell1.appendChild(contributor);
       cell2.appendChild(contributionContract);
       cell3.appendChild(contribution);

       row.appendChild(cell1);
       row.appendChild(cell2);
       row.appendChild(cell3);

       v2Table.appendChild(row);
     }

}

async function gatherLogs(){
	console.log("gather Logs")
	logs = new Object()

	let Topicv1 = ethers.utils.id("contribution(address,uint256)")
  let Topicv2 = ethers.utils.id("contribution(address,address,uint256)")

  let v1 = new Array()
  for(let j = 0;j<v1s.length;j++){
    let Filterv1 = createFilterv1(Topicv1,v1s[j].address)
    let Logsv1 = await provider.getLogs(Filterv1)
    let Infov1 = await getv1Info(Logsv1)
    v1.push(Infov1)
  }

  let Filterv2 = createFilterv2(Topicv2)
  let Logsv2 = await provider.getLogs(Filterv2)
  let Infov2 = await getv2Info(Logsv2)

	logs.v1 = v1
  logs.v2 = Infov2
  //event_logs.v2 = Infov2
}

async function getv1Info(v1logs) {

  let v1HexArray = ArrayifyLogData(v1logs)
  let v1Info = new Array()
  for (n=0;n<v1logs.length;n++){
  		let log = v1HexArray[n]
  		let eventInfo = new Object()
  		eventInfo.contributor = HexToAddress(log[0])
			eventInfo.contribution = HexToInt(log[1])
  		v1Info.push(eventInfo)
  	}
    return(v1Info)
}

async function getv2Info(v2logs) {

  let v2HexArray = ArrayifyLogData(v2logs)
  let v2Info = new Array()
  for (n=0;n<v2logs.length;n++){
  		let log = v2HexArray[n]
  		let eventInfo = new Object()
  		eventInfo.contributor = HexToAddress(log[0])
      eventInfo.contributionContract = HexToAddress(log[1])
			eventInfo.contribution = HexToInt(log[2])
  		v2Info.push(eventInfo)
  	}
    return(v2Info)
}
let fromBlock = 8044658
let toBlock = 8544658

function createFilterv1(topic,address){
  let filter = {
		address: address,
		fromBlock: fromBlock,
		toBlock: toBlock,
		topics: [ topic ]
	}
  return(filter)
}

function createFilterv2(topic){
  let filter = {
		address: parentAddress,
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
	return(ethers.utils.formatUnits(ethers.BigNumber.from(hex),decimals))
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
