//TODO
//multiple addresses in the distributor contract

//distribute by constant amount

pragma solidity ^0.5.0;

contract ERC20Basic {
  function totalSupply() public view returns (uint256);
  function balanceOf(address who) public view returns (uint256);
  function transfer(address to, uint256 value) public returns (bool);
  event Transfer(address indexed from, address indexed to, uint256 value);
}

contract ERC20 is ERC20Basic {
  function allowance(address owner, address spender) public view returns (uint256);
  function transferFrom(address from, address to, uint256 value) public returns (bool);
  function approve(address spender, uint256 value) public returns (bool);
  event Approval(address indexed owner, address indexed spender, uint256 value);
}

//UCASH Distribution Program Creator
contract uDistributor{
    address admin;

    address public UCASHAddress = 0xD021315678991ee801655C75101986200f0a011D;

    function distribute(address recipient,uint amount, uint period, uint rN, uint rD) public {
        //require(msg.sender == admin);
        require(period>0); require(rN<=rD); require(amount>0);
        require(dcAddresses[recipient].length<5,"Number of uDistribution programs per address cannot exceed 5.");

        distribution D = new distribution(recipient,period,rN,rD);
        ERC20(UCASHAddress).transferFrom(msg.sender,address(D),amount);
        //UReleaseContracts.push(address(U));
        if(dcAddresses[recipient].length==0){
            recipients.push(recipient);
        }
        dcAddresses[recipient].push(address(D));
    }

    function simpleDistribute(address recipient,uint amount, uint period, uint aPP) public {
        //require(msg.sender == admin);
        require(period>0); require(amount>0); require(aPP>0);
        require(dcAddresses[recipient].length<5,"Number of uDistribution programs per address cannot exceed 5.");

        simpleDistribution D = new simpleDistribution(recipient,period,aPP);
        ERC20(UCASHAddress).transferFrom(msg.sender,address(D),amount);
        //UReleaseContracts.push(address(U));
        if(dcAddresses[recipient].length==0){
            recipients.push(recipient);
        }
        dcAddresses[recipient].push(address(D));
    }

    address[] public recipients;

    mapping(address => address[]) public dcAddresses; //distribution contract Addresses

    function withdrawALL() public {
        uint numPrograms = dcAddresses[msg.sender].length;
        uint i;
        for(i=0;i<numPrograms;i++){
            distribution D = distribution(dcAddresses[msg.sender][i]);
            D.withdraw();
        }
    }

    function getWithdrawable() public view returns (uint withdrawable) {
        uint numPrograms = dcAddresses[msg.sender].length;
        uint i;
        for(i=0;i<numPrograms;i++){
            distribution D = distribution(dcAddresses[msg.sender][i]);
            withdrawable += D.getWithdrawable();
        }
    }

    function numRecipients() public view returns(uint){
        return recipients.length;
    }

    function numUDs(address recipient) public view returns(uint){
        return dcAddresses[recipient].length;
    }
}

//Distribution Program
contract distribution{
    address public recipient;
    uint public start;
    uint public lastTouch;

    uint public p; //period
    uint public rN; //ratio Numerator per period
    uint public rD; //ratio Denominator per period

    // get from predeployed contract
    address public UCASHAddress = 0xD021315678991ee801655C75101986200f0a011D;

    constructor(address _recipient,uint period,uint _rN,uint _rD) public{
        recipient = _recipient;
        p = period;
        rN = _rN;
        rD = _rD;
        lastTouch = now;
        start = now;
    }

    function withdraw() public {
        require(tx.origin == recipient);
        uint toWithdraw; uint elapsedPeriods;
        elapsedPeriods = (now - lastTouch)/p;

        if(elapsedPeriods>100){
            elapsedPeriods = 100;
        }

    uint vault = getBalance();
       for (uint i = 0;i<elapsedPeriods;i++){
            uint periodWithdrawal = vault*rN/rD;
            toWithdraw += periodWithdrawal;
            vault -= periodWithdrawal;
        }

        ERC20(UCASHAddress).transfer(recipient,toWithdraw);

        lastTouch += elapsedPeriods*p;
    }

    // function AuditVault() public {

    // }

    //think of better algo
    function getWithdrawable() public view returns (uint withdrawable){
        uint elapsedPeriods = (now - lastTouch)/p;
        uint v = getBalance();
        for (uint i = 0;i<elapsedPeriods;i++){
            uint thisperiod = v*rN/rD;
            withdrawable += thisperiod;
            v-=thisperiod;
        }
        return (withdrawable);
    }

    function getBalance() public view returns(uint){
        return ERC20(UCASHAddress).balanceOf(address(this));
    }
}

contract simpleDistribution{
    address public recipient;
    uint public start;
    uint public lastTouch;

    uint public p; //period
    uint public a; //amount released per period

    // get from predeployed contract
    address public UCASHAddress = 0xD021315678991ee801655C75101986200f0a011D;

    constructor(address _recipient,uint period,uint amount) public{
        recipient = _recipient;
        p = period;
        a = amount;
        lastTouch = now;
        start = now;
    }

    function withdraw() public {
        require(tx.origin == recipient);
        uint toWithdraw; uint elapsedPeriods;
        elapsedPeriods = (now - lastTouch)/p;

        toWithdraw = a*elapsedPeriods;
        if(toWithdraw>getBalance()){
            toWithdraw = getBalance();
        }

        ERC20(UCASHAddress).transfer(recipient,toWithdraw);

        lastTouch = now;
    }

    // function AuditVault() public {

    // }

    //think of better algo
    function getWithdrawable() public view returns (uint withdrawable){
        uint elapsedPeriods = (now - lastTouch)/p;
        withdrawable = a*elapsedPeriods;
        if(withdrawable>getBalance()){
            withdrawable = getBalance();
        }
        return (withdrawable);
    }

    function getBalance() public view returns(uint){
        return ERC20(UCASHAddress).balanceOf(address(this));
    }
}
