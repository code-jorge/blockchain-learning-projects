## Buildspace - Mint your own NFT collection

This project was created following the guide available at: [Buildspace - Mint NFT Collection](https://buildspace.so/p/mint-nft-collection)

### The smart contract

We are using **hardhat** to configure our contract. It is an utility tool that allows you to:

- Deploy a local blockchain to test out contracts
- Use `console.log` in `.sol` files to debug them a bit better
- Connect to the blockchain using the `--network` option to deploy contracts

We are using **Alchemy** to deploy our contract. It basically takes care of informing the node validators about the contract.

For this scenario, we are using the the contract available in `MyNFT.sol` - it's a simple NFT contract that uses 
**@openzeppelin** to securely implement most of the standard features (by extending the classes).

This particular contract is very small and stores the data on-chain -- probably not very practical for other contracts. To
store data on-chain it needs to be **base64 encoded**.

I have selected **Polygon** instead of **Ethereum** as my deploy chain. They are identical in functionality but the
gas fees in Matic are much much lower for now. 
This is why my code references the **Polygon** chain (The Polygon testnet is called `Mumbai` and has a chain ID of 80001).

You can run:

- `npx hardhat run scripts/deploy.js` - to deploy the contract locally
- `npx hardhat run scripts/deploy.js --network mumbai` - to deploy the contract on the Polygon testnet
- `npx hardhat run scripts/deploy.js --network polygon` - to deploy the contract on the Polygon mainnet

Deploying a contract on a blockchain requires gas, so, to get gas:

- Visit the [Alchemy Polygon Mumbai Faucet](https://mumbaifaucet.com/) to ask for some testnet **MATIC**
- For the mainnet you actually have to buy real life **MATIC** - no other way around it.

Another important step is verifying the contract, which requires an account in Polygon Scan
**Polygon Scan** is a tool that allows you to view transactions and blocks, both in the testnet and the mainnet.

To verify a contract, run:

`npx hardhat verify <contract-address> --network mumbai`

In my case, my contract address was **0xa1dC852870Af74aFD95Fd4D66C3f4DD2E78A5276**, so I ran

`npx hardhat verify 0xa1dC852870Af74aFD95Fd4D66C3f4DD2E78A5276 --network mumbai`

### The website

Once that's there, the contract is available on the blockchain, for anyone to use.

You will need to make sure you have the following info:

- Your contract address. Printed by **hardhat** when deploying.
- Your contract ABI. Located at `artifacts/contracts/MyNFT.sol/MyNFT.json`

(Your contract ABI might be in a different folder, depends on how you named your Solidity files)

Those two files go into the `website` folder, which is a separate project.

It's a `<React />` app, so you can use it to interact with the contract, thanks to `ethers`, an npm module
to interact with the blockchain and smart contracts.

I've added some basic functionality like minting, connecting with **Metamask**, checking if a mint is in progress,
checking what blockchain a user is connected to... But it's just React components, so it's possible to entirely re-write this
without having to deal with smart contracts. The smart contract is already deployed.

### Security

- Make sure never to commit the contents of your `.env` file to a public repository.

Well, in the case of the `website` folder, the file does not contain any sensitive information.
The contract address is public, and so is Polygon's testnet chain id.

If it's a purely frontend project it's probably not a huge problem to commit it, but the root level `.env` file contains
**API Keys** and **Private Keys**. It should never be commited to a public repository.