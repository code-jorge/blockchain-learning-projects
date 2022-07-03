import { ethers } from "ethers";

import abi from "../utils/Keyboards.json"

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const contractABI = abi.abi;

const getKeyboardsContract = (ethereum)=> {
  if(ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
  } else {
    return undefined;
  }
}

export default getKeyboardsContract;