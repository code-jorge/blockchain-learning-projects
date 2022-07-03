const mintNFT = require('./scripts/mint-nft');

console.log("Preparing to mint NFT...");
console.log("You have 10 seconds to cancel the process...");

setTimeout(()=> {
  mintNFT("https://jorge.aguirre.sexy/ntf/profile.json");
}, 10000);