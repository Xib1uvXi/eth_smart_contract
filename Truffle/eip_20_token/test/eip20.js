const EIP20 = artifacts.require('EIP20');

contract('EIP20', async (accounts) => {
    let QYC;

    beforeEach(async () => {
        QYC = await EIP20.new(10000, 'Qi Yuan Coin', 1, 'QYC', {from: accounts[0]})
    });

    it('creation: should create an initial balance of 10000 for the creator', async () => {
        const balance = await QYC.balanceOf.call(accounts[0]);
        assert.strictEqual(balance.toNumber(), 10000);
    });

    it('creation: test correct setting of vanity information', async () => {
        const name = await QYC.name.call();
        assert.strictEqual(name, 'Qi Yuan Coin');

        const decimals = await QYC.decimals.call();
        assert.strictEqual(decimals.toNumber(), 1);

        const symbol = await QYC.symbol.call();
        assert.strictEqual(symbol, 'QYC');
    });

    it('creation: should succeed in creating over 2^256 - 1 (max) tokens', async () => {
        // 2^256 - 1
        const QYC2 = await EIP20.new('115792089237316195423570985008687907853269984665640564039457584007913129639935',
            'Qi Yuan Coin', 1, 'QYC', {from: accounts[0]});
        const totalSupply = await QYC2.totalSupply();
        const match = totalSupply.equals('1.15792089237316195423570985008687907853269984665640564039457584007913129639935e+77');
        assert(match, 'result is not correct');
    });

    it('transfers: should transfer 10000 to accounts[1] with accounts[0] having 10000', async () => {
        await QYC.transfer(accounts[1], 10000, {from: accounts[0]});
        const balance = await QYC.balanceOf.call(accounts[1]);
        assert.strictEqual(balance.toNumber(), 10000);
    });

});