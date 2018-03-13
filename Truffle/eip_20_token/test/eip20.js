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

    it('transfers: should handle zero-transfers normally', async () => {
        assert(await QYC.transfer.call(accounts[1], 0, { from: accounts[0] }), 'zero-transfer has failed');
    });

    it('approvals: msg.sender should approve 100 to accounts[1]', async () => {
        await QYC.approve(accounts[1], 100, { from: accounts[0] });
        const allowance = await QYC.allowance.call(accounts[0], accounts[1]);
        assert.strictEqual(allowance.toNumber(), 100);
    });

    // it('approvals: msg.sender approves accounts[1] of 100 & withdraws 20 twice.', async () => {
    //     await QYC.approve(accounts[1], 100, { from: accounts[0] });
    //     const allowance01 = await QYC.allowance.call(accounts[0], accounts[1]);
    //     assert.strictEqual(allowance01.toNumber(), 100);
    //
    //     await QYC.transferFrom(accounts[0], accounts[2], 20, { from: accounts[1] });
    //     const allowance012 = await QYC.allowance.call(accounts[0], accounts[1]);
    //     assert.strictEqual(allowance012.toNumber(), 80);
    //
    //     const balance2 = await QYC.balanceOf.call(accounts[2]);
    //     assert.strictEqual(balance2.toNumber(), 20);
    //
    //     const balance0 = await QYC.balanceOf.call(accounts[0]);
    //     assert.strictEqual(balance0.toNumber(), 9980);
    //
    //     // FIRST tx done.
    //     // onto next.
    //     await QYC.transferFrom(accounts[0], accounts[2], 20, { from: accounts[1] });
    //     const allowance013 = await QYC.allowance.call(accounts[0], accounts[1]);
    //     assert.strictEqual(allowance013.toNumber(), 60);
    //
    //     const balance22 = await QYC.balanceOf.call(accounts[2]);
    //     assert.strictEqual(balance22.toNumber(), 40);
    //
    //     const balance02 = await QYC.balanceOf.call(accounts[0]);
    //     assert.strictEqual(balance02.toNumber(), 9960);
    // });

    // it('approvals: approve max (2^256 - 1)', async () => {
    //     await QYC.approve(accounts[1], '115792089237316195423570985008687907853269984665640564039457584007913129639935', { from: accounts[0] });
    //     const allowance = await QYC.allowance(accounts[0], accounts[1]);
    //     assert(allowance.equals('1.15792089237316195423570985008687907853269984665640564039457584007913129639935e+77'));
    // });

    // should approve max of msg.sender & withdraw 20 without changing allowance (should succeed).
    it('approvals: msg.sender approves accounts[1] of max (2^256 - 1) & withdraws 20', async () => {
        const balance0 = await QYC.balanceOf.call(accounts[0]);
        assert.strictEqual(balance0.toNumber(), 10000);

        const max = '1.15792089237316195423570985008687907853269984665640564039457584007913129639935e+77';
        await QYC.approve(accounts[1], max, { from: accounts[0] });
        const balance2 = await QYC.balanceOf.call(accounts[2]);
        assert.strictEqual(balance2.toNumber(), 0, 'balance2 not correct');

        await QYC.transferFrom(accounts[0], accounts[2], 20, { from: accounts[1] });
        const allowance01 = await QYC.allowance.call(accounts[0], accounts[1]);
        assert(allowance01.equals(max));

        const balance22 = await QYC.balanceOf.call(accounts[2]);
        assert.strictEqual(balance22.toNumber(), 20);

        const balance02 = await QYC.balanceOf.call(accounts[0]);
        assert.strictEqual(balance02.toNumber(), 9980);
    });

    /* eslint-disable no-underscore-dangle */
    it('events: should fire Transfer event properly', async () => {
        const res = await QYC.transfer(accounts[1], '2666', { from: accounts[0] });
        const transferLog = res.logs.find(element => element.event.match('Transfer'));
        assert.strictEqual(transferLog.args._from, accounts[0]);
        assert.strictEqual(transferLog.args._to, accounts[1]);
        assert.strictEqual(transferLog.args._value.toString(), '2666');
    });

    it('events: should fire Transfer event normally on a zero transfer', async () => {
        const res = await QYC.transfer(accounts[1], '0', { from: accounts[0] });
        const transferLog = res.logs.find(element => element.event.match('Transfer'));
        assert.strictEqual(transferLog.args._from, accounts[0]);
        assert.strictEqual(transferLog.args._to, accounts[1]);
        assert.strictEqual(transferLog.args._value.toString(), '0');
    });

    it('events: should fire Approval event properly', async () => {
        const res = await QYC.approve(accounts[1], '2666', { from: accounts[0] });
        const approvalLog = res.logs.find(element => element.event.match('Approval'));
        assert.strictEqual(approvalLog.args._owner, accounts[0]);
        assert.strictEqual(approvalLog.args._spender, accounts[1]);
        assert.strictEqual(approvalLog.args._value.toString(), '2666');
    });


});