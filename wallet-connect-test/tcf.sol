pragma solidity ^0.5.1;


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

contract tcf{

    address public testcash = 0x0f54093364b396461AAdf85C015Db597AAb56203;

    function dispense() public {
        require(ERC20(testcash).balanceOf(msg.sender)<=100000000,"You testcash already");
        uint balance = ERC20(testcash).balanceOf(address(this));
        ERC20(testcash).transfer(msg.sender,balance/100);
    }
}
