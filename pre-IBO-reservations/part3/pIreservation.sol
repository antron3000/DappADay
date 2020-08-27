pragma solidity ^0.7.0;



abstract contract ERC20 {
    function transfer(address to, uint256 value) public virtual returns (bool);
    function transferFrom(address from, address to, uint256 value) public virtual returns (bool);
}

contract pIReservations{
    mapping(string => uint) aliasBalances;
    mapping(address => string) hunterToAlias;

    address public owner;

    event awarded(string hunterAlias, string name, string description, uint amount);
    event redeemed(address Hunter, uint amount);
    event hunterAdded(string hunterAlias, address Hunter);

    address devcash = 0x0f54093364b396461AAdf85C015Db597AAb56203;

    constructor() public{
        owner = msg.sender;
    }

    function awardBounty(string memory hunterAlias, string memory name, string memory description, uint amount) public {
        require(owner==msg.sender);
        ERC20(devcash).transferFrom(msg.sender,address(this),amount);
        aliasBalances[hunterAlias] += amount;
        emit awarded(hunterAlias,name,description,amount);
    }

    function addHunter(string memory hunterAlias,address Hunter) public{
        require(owner==msg.sender);
        hunterToAlias[Hunter] = hunterAlias;
        emit hunterAdded(hunterAlias,Hunter);
    }

    function redeem() public{
        uint amount = aliasBalances[hunterToAlias[msg.sender]];
        aliasBalances[hunterToAlias[msg.sender]] = 0;
        ERC20(devcash).transfer(msg.sender,amount);
        emit redeemed(msg.sender,amount);
    }
}
