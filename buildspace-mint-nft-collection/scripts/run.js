const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory('MyNFT');
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log("Contract deployed to:", nftContract.address);

   // Call the mint function.
   
   let txn = await nftContract.mintNFT({ value: hre.ethers.utils.parseEther("1") })
   await txn.wait()
   console.log("Minted NFT")
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
