var signer;
var provider;
var ethers;
var utils;
var overrides;
var URPList;

var UDContract,UCASHContract; //uDistribute Contract and UCASH contracat
var UDContractAddress = '0xEE39Be5Aa83972CD6b088CcF07657B00D1AE776E';
var UCASHContractAddress = '0x92e52a1A235d9A103D970901066CE910AAceFD37';
var UCASHABI = [
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
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
				"name": "_spender",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
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
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
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
				"name": "_from",
				"type": "address"
			},
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
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
				"name": "",
				"type": "address"
			}
		],
		"name": "balances",
		"outputs": [
			{
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
		"inputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "allowed",
		"outputs": [
			{
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
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
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
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
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
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
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
				"name": "bountyHunter",
				"type": "address"
			},
			{
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
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			},
			{
				"name": "_spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"name": "remaining",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
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
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_owner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_spender",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	}
]
var UDABI = [
	{
		"constant": true,
		"inputs": [],
		"name": "getWithdrawable",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "withdrawable",
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
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "period",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "aPP",
				"type": "uint256"
			}
		],
		"name": "simpleDistribute",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			}
		],
		"name": "numUDs",
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
		"name": "withdrawALL",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "period",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "rN",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "rD",
				"type": "uint256"
			}
		],
		"name": "distribute",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "numRecipients",
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
		"name": "recipients",
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
		"name": "UCASHAddress",
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
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "dcAddresses",
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
var DABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "period",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "UCASHAddress",
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
		"name": "a",
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
		"name": "getBalance",
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
		"name": "getWithdrawable",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "withdrawable",
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
		"name": "lastTouch",
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
		"name": "p",
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
		"name": "recipient",
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
		"name": "start",
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
		"name": "withdraw",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
] //Distribution contract ABI


async function initialize(web3){
	ethereum.enable()
  provider = new ethers.providers.Web3Provider(web3.currentProvider);
  utils = ethers.utils;
  let accounts = await provider.listAccounts()

  signer = provider.getSigner(accounts[0]);

    UDContract = new ethers.Contract(UDContractAddress, UDABI, signer);
		UCASHContract = new ethers.Contract(UCASHContractAddress,UCASHABI,signer)
		overrides = {
		}

		displayWalletDetails();
		populateURPTable();

}

async function create(){
		let address = document.getElementById("address").value
		let amount = document.getElementById("amount").value
		let percentage = document.getElementById("percentage").value

		var l = document.getElementById("periodList");
		var i = document.getElementById("interval").value
		var period = l.options[l.selectedIndex].value*i;

		amount = utils.parseUnits(amount,8);
		//console.log(address,amount,period,percentage);
		console.log(address)
		console.log(amount)
		console.log(interval)
		console.log(period)
		console.log(percentage)

    await UDContract.distribute(address,amount,period,percentage,100,overrides);
}

async function create1(){
		let address = document.getElementById("address1").value
		let amount = document.getElementById("amount1").value
		let amountPerPeriod = document.getElementById("amountPerPeriod").value
		amountPerPeriod = utils.parseUnits(amountPerPeriod,8)

		var l = document.getElementById("periodList1");
		var i = document.getElementById("interval1").value
		var period = l.options[l.selectedIndex].value*i;

		amount = utils.parseUnits(amount,8);
		//console.log(address,amount,period,percentage);
		console.log(address)
		console.log(amount)
		console.log(interval)
		console.log(period)
		console.log(amountPerPeriod)

    await UDContract.simpleDistribute(address,amount,period,amountPerPeriod,overrides);
}

async function withdraw(){
	//await UReleaseContract.withdrawALL(overrides);
//u = new ethers.Contract("0x2B2AC520eaeb379523E3D6366c009B62a4fcF0c0",DABI,signer)
	await UDContract.withdrawALL(overrides);
}

async function approve(){
	var amount = 	document.getElementById("approveAmount").value;
	amount = utils.parseUnits(amount,8)
	await UCASHContract.approve(UDContractAddress,amount);
}

async function displayWalletDetails(){
	var balance = await UCASHContract.balanceOf(signer._address)
	var approved = await UCASHContract.allowance(signer._address,UDContractAddress)

	balance = utils.formatUnits(balance,8);
	approved = utils.formatUnits(approved,8);
	balance = utils.commify(balance);
	approved = utils.commify(approved);

	document.getElementById("UCASHBalance").innerHTML = "Balance: "+ balance + " UCASH"
	document.getElementById("UCASHApproved").innerHTML = "Approved: " + approved +  " UCASH"
}

async function populateURPTable(){
	var DTable = document.getElementById('DTable'); //table of distributions
	console.log(UDContract)
	let numR = await UDContract.numRecipients();
	console.log(numR)

	for(var o=0;o<numR;o++){
		console.log(o)
		console.log(numR)
		let r = await UDContract.recipients(o); //recipient
		let numUDs = await UDContract.numUDs(r);
		console.log(numUDs)
		for(var j=0;j<numUDs;j++){
			let dAddress = await UDContract.dcAddresses(r,j)

			DContract = new ethers.Contract(dAddress, DABI, signer);

			var newRow  = DTable.insertRow(DTable.rows.length);


			var addressCell  = newRow.insertCell(0);
			var addressText = document.createTextNode(r);
			addressCell.appendChild(addressText);


	    var started = await DContract.start();
			var started = new Date(started*1000);
			var startedCell  = newRow.insertCell(1);
			var startedText  = document.createTextNode(started);
			startedCell.appendChild(startedText);


			var lastwithdrawn =  await DContract.lastTouch()
			var lastwithdrawn = new Date(lastwithdrawn*1000);
			var lastwithdrawnCell  = newRow.insertCell(2);
			var lastwithdrawnText = document.createTextNode(lastwithdrawn);
			lastwithdrawnCell.appendChild(lastwithdrawnText);


			var period = await DContract.p()
			var periodCell = newRow.insertCell(3);
			var periodText = document.createTextNode(period);
			periodCell.appendChild(periodText);


			var w
			try{
				let overrides = {}//gasLimit: 600000000}
					w = await DContract.getWithdrawable(overrides)
					w = utils.formatUnits(w,8);
					w = utils.commify(w)
			} catch{
				w = "zero"
				console.log(DContract)
			}

			var wCell = newRow.insertCell(4);
			var wText = document.createTextNode(w + " UCASH");
			wCell.appendChild(wText);


			var vault = await DContract.getBalance()
			vault = utils.formatUnits(vault,8);
			vault = utils.commify(vault)
			var vaultCell = newRow.insertCell(5);
			var vaultText = document.createTextNode(vault + " UCASH");
			vaultCell.appendChild(vaultText);
		}
	}

	//var numRecipients = await UREleas
	var withdrawable = await UDContract.getWithdrawable();
	withdrawable = utils.formatUnits(withdrawable,8);
	withdrawable = utils.commify(withdrawable);

	document.getElementById("totalWithdrawable").innerHTML = "Total Withdrawable: " + withdrawable + " UCASH"
}

dispenserAddress = "0x314c563161b5139Ba704e757385260cc5A7bd0F0"
dispenserABI =
	[
		{
			"constant": false,
			"inputs": [],
			"name": "dispense",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"constant": true,
			"inputs": [],
			"name": "UCASHAddress",
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

async function dispense() {
	dispenseContract = new ethers.Contract(dispenserAddress,dispenserABI,signer)
	await dispenseContract.dispense()
}
