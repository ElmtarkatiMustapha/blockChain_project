module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    }
  },
  compilers: {
    solc: {
      version: "0.8.0", // or whatever version you want to use
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  contracts_build_directory: "./assets/jsonContract"
}