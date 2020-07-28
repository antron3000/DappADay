pragma solidity ^0.6.10;

abstract contract ERC20{
    function balanceOf(address who) public virtual view returns (uint256);
    function transfer(address to, uint256 value) public virtual returns (bool);
    function transferFrom(address from, address to, uint256 value) public virtual returns (bool);
}

abstract contract ERC20Approve {
 function approve(address spender, uint256 value) public virtual returns (bool);
}

contract tutors{
    event booked(string studentName, address studentAddress, uint _hours);

    address public owner;
    address public devcash = 0xab3A3f3Df683513De7d060a045A01a13b811F422;
    uint public price;

    constructor() public {
        owner = msg.sender;
    }

    function setPrice(uint _price) public {
        require(msg.sender==owner);
        price = _price;
    }
    function book(string memory name, uint _hours) public {
        uint fee = _hours*price;
        emit booked(name, msg.sender,_hours);
        ERC20(devcash).transferFrom(msg.sender,owner,fee);
    }
}
