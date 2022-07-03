import { readFileSync } from 'fs';
import { sdk } from './helpers.js';

async function main() {
  // The bundle address comes from the result of the previous script
  const bundleModuleAddress = '0x176dE3A356252dfabD756746B185A1145153dfB4';
  const bundleModule = sdk.getBundleModule(bundleModuleAddress);

  console.log('Creating NFT batch...');

  const created = await bundleModule.createAndMintBatch([
    {
      metadata: {
        name: 'Pride City',
        description: 'Steampunk city open to all',
        image: readFileSync('./assets/pride-city.jpg'),
        properties: {
          rarity: 'A bit rare',
          fanciness: 7,
        }
      },
      supply: 50,
    },
    {
      metadata: {
        name: 'Beach City',
        description: 'Steampunk city by the beach!',
        image: readFileSync('./assets/beach-city.jpg'),
        properties: {
          rarity: 'A bit rare',
          fanciness: 7,
        }
      },
      supply: 50,
    },
    {
      metadata: {
        name: 'Poison City',
        description: 'A dark forgotten city!',
        image: readFileSync('./assets/poison-city.jpg'),
        properties: {
          rarity: 'Super rare!',
          fanciness: 10,
        }
      },
      supply: 10,
    }
  ]);

  console.log('NFTs created!')
  console.log(JSON.stringify(created, null, 2));
}

try {
  await main();
} catch (error) {
  console.error("Error minting the NFTs", error);
  process.exit(1);
}