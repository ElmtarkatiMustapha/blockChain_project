// var Web3 = require('web3');
App = {
    loading: false,
    contracts: {},
    load: async () => {
        await App.loadWeb3()
        await App.loadAccount()
        await App.loadContract()
        await App.render()
        await App.renderTasks()
    },
    // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  loadWeb3: async () => {
    if (typeof web3 !== 'undefined') {
    //   App.web3Provider = web3.currentProvider
    //   web3 = new Web3(web3.currentProvider)
        App.web3Provider = new Web3.providers.HttpProvider("http://localhost:7545");
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
    } else {
        App.web3Provider = new Web3.providers.HttpProvider("http://localhost:7545");
        web3 = new Web3(App.web3Provider);
        // window.alert("Please connect to Metamask.")
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
        console.log(accounts);
    },
    loadContract: async () => {
        // import myFile from './../build/contracts/TodoListe.json' assert{type:json};
        const todoListe = await $.getJSON('TodoListe.json')
        App.contracts.TodoListe = TruffleContract(todoListe)
        App.contracts.TodoListe.setProvider(App.web3Provider)
        App.todoListe = await App.contracts.TodoListe.deployed()
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
    
    renderTasks: async () => {
        // Load the total task count from the blockchain
        const taskCount = await App.todoListe.taskCount()
        const $taskTemplate = $('.taskTemplate')

        // Render out each task with a new task template
        for (var i = 1; i <= taskCount.toNumber(); i++) {
        // Fetch the task data from the blockchain
        const task = await App.todoListe.tasks(i)
        const taskId = task[0].toNumber()
        const taskContent = task[1]
        const taskCompleted = task[2]

        // Create the html for the task
        const $newTaskTemplate = $taskTemplate.clone()
        $newTaskTemplate.find('.content').html(taskContent)
        $newTaskTemplate.find('input')
                        .prop('name', taskId)
                        .prop('checked', taskCompleted)
                        .on('click', App.toggleCompleted)

        // Put the task in the correct list
        if (taskCompleted) {
            $('#completedTaskList').append($newTaskTemplate)
        } else {
            $('#taskList').append($newTaskTemplate)
        }

        // Show the task
        $newTaskTemplate.show()
        }
    },
    createTask: async () => {
        
        App.setLoading(true);
        const content = $("#newTask").val();
        console.log(App.account)
        await App.todoListe.createTask(content,{ from: App.account[0] });
        window.location.reload();
    } ,
    setLoading: (boolean) => {
        App.loading = boolean
        const loader = $('#loader')
        const content = $('#content')
        if (boolean) {
        loader.show()
        content.hide()
        } else {
        loader.hide()
        content.show()
        }
    }
}
// App.load();
$(() => {
    $(window).load(() => {
        App.load()
    })
})