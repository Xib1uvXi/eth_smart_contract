pragma solidity ^0.4.17;

import "./EIP20Interface.sol";

// 继承 EIP20Interface
contract EIP20 is EIP20Interface {

    uint256 constant private MAX_UINT256 = 2 ** 256 - 1;

    mapping(address => uint256) public balances;
    mapping(address => mapping(address => uint256)) public allowed;

    //fancy name
    string public name;

    //How many decimals to show.
    uint8 public decimals;

    //An identifier
    string public symbol;

    // 构造函数
    function EIP20(uint256 _initialAmount, string _tokenName, uint8 _decimalUnits, string _tokenSymbol) public {
        // Give the creator all initial tokens
        balances[msg.sender] = _initialAmount;

        // Update total supply
        totalSupply = _initialAmount;

        // Set the name for display purposes
        name = _tokenName;

        // Amount of decimals for display purposes
        decimals = _decimalUnits;

        // Set the symbol for display purposes
        symbol = _tokenSymbol;
    }

    // 转账
    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balances[msg.sender] >= _value);
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        Transfer(msg.sender, _to, _value);
        return true;
    }


    // 提取
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        uint256 allowance = allowed[_from][msg.sender];
        require(balances[_from] >= _value && allowance >= _value);
        balances[_to] += _value;
        balances[_from] -= _value;
        if (allowance < MAX_UINT256) {
            allowed[_from][msg.sender] -= _value;
        }
        Transfer(_from, _to, _value);
        return true;
    }

    // 查询账户token余额
    function balanceOf(address _owner) public view returns (uint256 balance) {
        return balances[_owner];
    }

    // 批准提取多少, 允许_spender多次取回帐户，最高达_value金额
    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowed[msg.sender][_spender] = _value;
        Approval(msg.sender, _spender, _value);
        return true;
    }

    // 返回_spender仍然被允许从_owner提取的金额。
    function allowance(address _owner, address _spender) public view returns (uint256 remaining) {
        return allowed[_owner][_spender];
    }

}
