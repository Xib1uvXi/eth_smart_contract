# first truffle summary

## Kill Function
```
function kill() public {
        if (msg.sender == creator)
            selfdestruct(creator);          // selfdestruct!!!
    }
``` 

## Visibility And Accessors
```
Solidity对函数和状态变量提供了四种可见性。分别是external,public,internal,private。其中函数默认是public。状态变量默认的可见性是internal。

external:

外部函数是合约接口的一部分，所以我们可以从其它合约或通过交易来发起调用。一个外部函数f，不能通过内部的方式来发起调用，（如f()不可以，但可以通过this.f()）。外部函数在接收大的数组数据时更加有效。

public:

公开函数是合约接口的一部分，可以通过内部，或者消息来进行调用。对于public类型的状态变量，会自动创建一个访问器（详见下文）。

internal：

这样声明的函数和状态变量只能通过内部访问。如在当前合约中调用，或继承的合约里调用。需要注意的是不能加前缀this，前缀this是表示通过外部方式访问。

private：

私有函数和状态变量仅在当前合约中可以访问，在继承的合约内，不可访问。

```

## Constructor 
```
如果构造函数是需要参数的，例如： 
function Greeter(string _greeting) public {
        // ...
    }
    
在2_deploy_contracts.js里 ：
deployer.deploy(Greeter, "xib");  // 第二个参数开始就是你构造函数定义需要的参数
```

## Config truffle.js
```
add networks, 例如：

networks: {
        test: {
            host: "localhost",
            port: 8545,
            network_id: "*" // Match any network id
        },
        development: {
            host: "localhost",
            port: 8545,
            network_id: "*" // match any network
        }
    }
```

## truffle compile
```
## 编译 合约
truffle compile
```

## truffle migrate
```
## 发布 合约
truffle migrate --network=???
```

## test
```
truffle test ----network=???

关于测试：
需要创建test文件夹, 编写test

如果函数没有参数 就用call

如果函数有参数就直接调 例如：

        let instance = await Greeter.deployed();

        await instance.setGreeting("gigi");

        let greetResult = await instance.greet.call();

        assert.equal(greetResult, "gigi")


run test : 
./run_test.sh
```

