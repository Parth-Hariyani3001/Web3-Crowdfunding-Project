import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x8b5A9Fb410E6204582f3861bc2664dF4B23b023A'
);

export default instance;


// import CampaignFactory from './build/CampaignFactory.json';
 
// const Web3 = require("web3");
 
// let web3;
 
// if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") 
// {
//   // We are in the browser and metamask is running.
//   window.ethereum.request({ method: "eth_requestAccounts" });
//   web3 = new Web3(window.ethereum);
// } 
// else 
// {
//   // We are on the server *OR* the user is not running metamask
//   const provider = new Web3.providers.HttpProvider
// (
//     'https://sepolia.infura.io/v3/e23d725ae2a64c769fc3ae3ffecc83a1'
//   );
//   web3 = new Web3(provider);
// }
 
// const instance =new web3.eth.Contract
// (
//    JSON.parse(CampaignFactory.interface), 
//   '0x8b5A9Fb410E6204582f3861bc2664dF4B23b023A'
// );
 
// export default instance;