module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // to customize your Truffle configuration!

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

};
