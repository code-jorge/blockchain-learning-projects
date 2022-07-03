import { readFileSync } from 'fs';
import { sdk } from './helpers.js';

async function main() {

  // Bundle module address (Step 1 result)
  const bundleModuleAddress = '0x176dE3A356252dfabD756746B185A1145153dfB4'; 
  const bundleModule = sdk.getBundleModule(bundleModuleAddress);

  // Pack module address (Step 3 result)
  const packModuleAddress = '0xAD97030fF961845623e65527e456483dbBf25d6c'; 
  const packModule = sdk.getPackModule(packModuleAddress);

  console.log('Getting all NFTs from bundle...');
  const nftsInBundle = await bundleModule.getAll();

  console.log('NFTs in bundle:');
  console.log(nftsInBundle);

  console.log('Creating a pack containing the NFTs from bundle...');
  const created = await packModule.create({
    assetContract: bundleModuleAddress,
    metadata: {
      name: 'Cities of the future pack!',
      image: readFileSync('./assets/city-at-war.jpg'),
    },
    assets: nftsInBundle.map(nft => ({
      tokenId: nft.metadata.id,
      amount: nft.supply,
    })),
  });

  console.log('Pack created!')
  console.log(created);
}

try {
  await main();
} catch (error) {
  console.error("Error minting the NFTs", error);
  process.exit(1);
}