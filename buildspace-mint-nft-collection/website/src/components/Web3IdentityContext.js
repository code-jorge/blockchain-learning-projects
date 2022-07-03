import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { ethers } from "ethers";

const Web3IdentityContext = createContext();

export const Web3IdentityProvider = ({ children })=> {

  const providerRef = useRef();

  const [currentAccount, setCurrentAccount] = useState("");
  const [currentChain, setCurrentChain] = useState("");


  const configureWeb3Details = async () => {
    if (!window.ethereum) {
      console.log("Make sure you have metamask!");
      return;
    }
    else {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }

      const network = await provider.getNetwork();
      if (network) {
        const chainId = network.chainId;
        console.log("Found a network:", chainId);
        setCurrentChain(`${chainId}`);
      }
      providerRef.current = provider
    }
  }

  useEffect(()=> {
    configureWeb3Details(); 
  }, [])

  useEffect(()=> {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', configureWeb3Details) 
      window.ethereum.on('accountsChanged', configureWeb3Details)
    }
    return () => {
      if (!providerRef.current) return;
      providerRef.current.off('chainChanged') 
      providerRef.current.off('accountsChanged') 
    }
  }, [])

  const connectWallet = async ()=> {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });
        console.log("Connected", accounts[0]);
        setCurrentAccount(accounts[0]); 
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Web3IdentityContext.Provider 
      value={{
        account: currentAccount,
        chain: currentChain,
        connectWallet
      }}
    >
      {children}
    </Web3IdentityContext.Provider>
  )

}

export const useWeb3Identity = () => useContext(Web3IdentityContext);