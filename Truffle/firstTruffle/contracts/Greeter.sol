pragma solidity ^0.4.8;

contract Greeter {
    address creator;
    string greeting;

    function Greeter(string _greeting) public {
        creator = msg.sender;
        greeting = _greeting;
    }

    function greet() public constant returns (string) {
        return greeting;
    }

    function setGreeting(string _newgreeting) public {
        greeting = _newgreeting;
    }

    /**********
    Standard kill() function to recover funds
    **********/

    function kill() public {
        if (msg.sender == creator)
            selfdestruct(creator);
    }

}