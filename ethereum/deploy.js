const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
  'fatigue feed science culture soldier alarm squirrel sibling age butter bounce family',
  // remember to change this to your own phrase!
  'https://sepolia.infura.io/v3/e23d725ae2a64c769fc3ae3ffecc83a1'
  // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
  
    console.log('Attempting to deploy from account', accounts[0]);
  
    const result = await new web3.eth.Contract(
      JSON.parse(compiledFactory.interface)
    )
      .deploy({ data: compiledFactory.bytecode })
      .send({ gas: '1000000', from: accounts[0]});
  
    console.log('Contract deployed to', result.options.address);
    provider.engine.stop();
  };
  deploy();
  