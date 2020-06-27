pragma solidity ^0.6.10;

contract Dappaday {
    address me;

    event newDapp(string name, string description, string link, string repository);

    constructor () public{
        me = msg.sender;
    }

    function add(string memory name, string memory description, string memory link, string memory repository) public {
        require(msg.sender==me);
        emit newDapp(name,description,link,repository);
    }
}
