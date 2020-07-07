pragma solidity ^0.6.10;

//funds stored in child contract
contract contributev1{
    address payable owner = 0xcCFf9552b8680EF2f29566a42185992eBF102Fee;
    event contribution(address contributor, uint amount);
    receive() external payable {
        emit contribution(msg.sender,msg.value);
    }
    function withdraw() public{
        owner.transfer(address(this).balance);
    }

}

//funds stored in parent contract
contract contributev2{
    address parent;
    constructor() public {
        parent = msg.sender;
    }
    receive() external payable {
        parent.call{gas:50000,value: msg.value}("");
    }
}

contract contributeParent{
    address payable owner = 0xcCFf9552b8680EF2f29566a42185992eBF102Fee;

    address[] v1s;
    address[] v2s;

    function deployv1() public {
        contributev1 c = new contributev1();
        v1s.push(address(c));
    }


    function deployv2() public {
        contributev2 c = new contributev2();
        v2s.push(address(c));
    }

    function withdraw() public {
        owner.transfer(address(this).balance);
    }

    event contribution(address contributor, address contributionContract, uint amount);

    fallback() external payable{
        emit contribution(tx.origin, msg.sender, msg.value);
    }
}
