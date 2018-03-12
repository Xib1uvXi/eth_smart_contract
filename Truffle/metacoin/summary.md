# Metacoin truffle summary

## Purn / View 

### Pure Functions
Functions can be declared pure in which case they promise not to read from or modify the state.  
In addition to the list of state modifying statements explained above, the following are considered reading from the state:  
1. Reading from state variables.
2. Accessing this.balance or <address>.balance.
3. Accessing any of the members of block, tx, msg (with the exception of msg.sig and msg.data).
4. Calling any function not marked pure.
5. Using inline assembly that contains certain opcodes.

```
pragma solidity ^0.4.16;

contract C {
    function f(uint a, uint b) pure returns (uint) {
        return a * (b + 42);
    }
}
```

### View Functions
Functions can be declared view in which case they promise not to modify the state.  
The following statements are considered modifying the state:  
1. Writing to state variables.
2. Emitting events..
3. Creating other contracts.
4. Using selfdestruct.
5. Sending Ether via calls.
6. Calling any function not marked view or pure.
7. Using low-level calls.
8. Using inline assembly that contains certain opcodes.

```
pragma solidity ^0.4.16;

contract C {
    function f(uint a, uint b) view returns (uint) {
        return a * (b + 42) + now;
    }
}
```

## Special Variables and Functions

- block.blockhash(uint blockNumber) returns (bytes32)，给定区块号的哈希值，只支持最近256个区块，且不包含当前区块。
- block.coinbase (address) 当前块矿工的地址。
- block.difficulty (uint)当前块的难度。
- block.gaslimit (uint)当前块的gaslimit。
- block.number (uint)当前区块的块号。
- block.timestamp (uint)当前块的时间戳。
- msg.data (bytes)完整的调用数据（calldata）。
- msg.gas (uint)当前还剩的gas。
- msg.sender (address)当前调用发起人的地址。
- msg.sig (bytes4)调用数据的前四个字节（函数标识符）。
- msg.value (uint)这个消息所附带的货币量，单位为wei。
- now (uint)当前块的时间戳，等同于block.timestamp
- tx.gasprice (uint) 交易的gas价格。
- tx.origin (address)交易的发送者（完整的调用链）

msg的所有成员值，如msg.sender,msg.value的值可以因为每一次外部函数调用，或库函数调用发生变化（因为msg就是和调用相关的全局变量）。

如果你想在库函数中，用msg.sender实现访问控制，你需要将msg.sender做为参数（就是说不能使用默认的msg.value，因为它可能被更改）。

## Truffle link
```
// todo link
deployer.link(ConvertLib, MetaCoin); // metacoin need use lib func
```

## HomesteadBlock
For those of you that uses a private net geth for development, configure your genesis block as follows:
```
{
    "config": {
            "homesteadBlock": 10
    },
    "nonce": "0",
    "difficulty": "0x20000",
    "mixhash": "0x00000000000000000000000000000000000000647572616c65787365646c6578",
    "coinbase": "0x0000000000000000000000000000000000000000",
    "timestamp": "0x00",
    "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "extraData": "0x",
    "gasLimit": "0x2FEFD8",
    "alloc": {}
}
```
The key point here is the homesteadBlock, which enables certain features including DELEGATECALL, which is what libraries are dependent on.

Homestead block is by default set to 1.150.000. This would explain why truffle works with testrpc but not with a private chain.

Source: <a>https://blog.ethereum.org/2016/02/29/homestead-release/ </a>