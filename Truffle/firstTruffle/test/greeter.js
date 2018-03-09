const Greeter = artifacts.require("Greeter.sol");

contract('Greeter.sol', async (accounts) => {
    it('test greet() return xib', async () => {
        let instance = await Greeter.deployed();

        let greetResult = await instance.greet.call();

        assert.equal(greetResult, "xib")
    });

    it('test setGreeting()', async () => {
        let instance = await Greeter.deployed();

        let setGreetResult = await instance.setGreeting.call("gigi");

        console.log(setGreetResult);

        let greetResult = await instance.greet.call();

        assert.equal(greetResult, "gigi")
    });


})