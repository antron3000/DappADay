pragma solidity ^0.6.10;

contract identityPratice{
    address owner;

    constructor () public{
        owner = msg.sender;
    }

    struct identity{
        string name;
        address _address;
    }

    identity[] public identities;
    function add(string memory name, address _address) public {
        require(msg.sender==owner);
        identity memory i = identity(name,_address);
        identities.push(i);
    }

}
