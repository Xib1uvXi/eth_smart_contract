const Greeter = artifacts.require("Greeter.sol");

contract('Greeter.sol', async (accounts) => {
    it('should greet() return xib', async () => {
        let instance = await Greeter.deployed();

        let greetResult = await instance.greet.call();

        assert.equal(greetResult, "xib")
    });
})