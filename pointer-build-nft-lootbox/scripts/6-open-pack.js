import { sdk } from "./helpers.js";

async function main() {
  
  // Pack module address (Step 3 result)
  const packModuleAddress = '0xAD97030fF961845623e65527e456483dbBf25d6c'; 
  const packModule = sdk.getPackModule(packModuleAddress);

  console.log('Opening the pack...');
  const opened = await packModule.open('0');
  console.log('Opened the pack!');
  console.log(opened);
}

try {
  await main();
} catch (error) {
  console.error("Error opening the pack", error);
  process.exit(1);
}