App = {
    loading: false,
    contracts : {},
    load: async () => {
        await App.loadWeb3()
        await App.loadAccount()
        await App.loadContract()
        await App.render()
        await App.searchByName()
        await App.searchByid()
        await App.searchByCin()
        await App.searchByCne()
        await App.searchBySession()
    },
    loadWeb3: async () => {
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider
            web3 = new Web3(web3.currentProvider)
        } else {
          // App.web3Provider = new Web3.providers.HttpProvider("http://localhost:7545");
          // web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
          window.alert("Please connect to Metamask.");
        }
        // Modern dapp browsers...
        if (window.ethereum) {
            window.web3 = new Web3(ethereum)
            try {
                // Request account access if needed
                await ethereum.enable()
                // Acccounts now exposed
                web3.eth.sendTransaction({/* ... */})
            } catch (error) {
                // User denied account access...
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
        App.web3Provider = web3.currentProvider
        window.web3 = new Web3(web3.currentProvider)
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */})
        }
        // Non-dapp browsers...
        else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    },
    loadAccount: async () => {
        var accounts = await web3.eth.getAccounts().then(function (acc) { return acc })
        App.account = accounts;
        //console.log(accounts);
    },
    loadContract: async () => {
        const diplomes = await $.getJSON('Diplomes.json')
        App.contracts.Diplomes = TruffleContract(diplomes)
        App.contracts.Diplomes.setProvider(App.web3Provider)
        App.diplomes = await App.contracts.Diplomes.deployed()
    },
    render: async ()=>{
        // Prevent double render
        if (App.loading) {
        return
        }

        // Update app loading state
        App.setLoading(true)

        // Render Account
        $('#account').html(App.account)
        // Update loading state
        App.setLoading(false)
    },
    searchByName: async (name) => {
        return await App.diplomes.searchByName(name, { from: App.account[0] })
    },
    searchByid: async (id) => {
        return await application.diplomes.searchByid(id, {from: App.account[0]})
    },
    searchByCin: async (cin) => {
        return await application.diplomes.searchByCin(cin, {from: App.account[0]})
    },
    searchByCne: async (cne) => {
        return await application.diplomes.searchByCne(cne, {from: App.account[0]})
    },
    searchBySession: async (session) => {
        return await application.diplomes.searchBySession(session, {from: App.account[0]})
    }
}
$(() => {
    $(window).load(() => {
        App.load()
    })
})