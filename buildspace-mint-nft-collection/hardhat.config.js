require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-etherscan');
require("dotenv").config({ path: ".env" });

module.exports = {
  solidity: '0.8.1',
  networks: {
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.MUMBAI_POLYGON_ALCHEMY_API_KEY}`,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY],
    },
    polygon: {
      url: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.POLYGON_ALCHEMY_API_KEY}`,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY],
    }
  },
  etherscan: {
    apiKey: process.env.POLYGON_SCAN_API_KEY
  },
};