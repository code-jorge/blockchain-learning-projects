require("dotenv").config();

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

const { 
  API_URL,
  PUBLIC_KEY,
  PRIVATE_KEY
} = process.env.API_URL;

const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/nft.sol/JorgeNFT.json");

const CONTRACT_ADDRESS = "0xb203531daa3690be450c93913702e9d480074a64";

const nftContract = new web3.eth.Contract(contract.abi, CONTRACT_ADDRESS);

const mintNFT =  async (tokenURI)=> {
  // Get latest nonce
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest');

  // The transaction
  const tx = {
    'from': PUBLIC_KEY,
    'to': CONTRACT_ADDRESS,
    'nonce': nonce,
    'gas': 500000,
    'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
  };

  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);

  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        (err, hash)=> {
          if (!err) {
            console.log(`The hash of your transaction is: ${hash}`);
            console.log("Check Alchemy's Mempool to view the status of your transaction!");
          } else {
            console.error("Something went wrong when submitting your transaction");
            console.error(err);
          }
        }
      )
    })
    .catch(err => {
      console.error("Promise failed");
      console.error(err);
    });
}

module.exports = mintNFT;