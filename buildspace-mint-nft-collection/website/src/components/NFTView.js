import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useWeb3Identity } from "./Web3IdentityContext";
import { FailedTxn, SuccessTxn } from "./TransactionResult";
import twitterLogo from '../assets/twitter-logo.svg';
import myEpicNft from '../utils/MyNFT.json';

const { 
  REACT_APP_CONTRACT_ADDRESS: CONTRACT_ADDRESS, 
  REACT_APP_CONTRACT_CHAIN: CONTRACT_CHAIN 
} = process.env;

const NFTView = ()=> {

  const { account, chain, connectWallet } = useWeb3Identity();

  const [accountTokens, setAccountTokens] = useState(0);

  const [isMinting, setMinting] = useState(false)
  const [mintingResult, setMintingResult] = useState(null)

  useEffect(()=> {
    if (account && chain === CONTRACT_CHAIN && !isMinting) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myEpicNft.abi, signer);
      connectedContract.balanceOf(account).then(data=> {
        setAccountTokens(data.toString())
      });
    }
    else if (!isMinting) {
      setAccountTokens(0)
    }
  }, [account, chain, isMinting]);


  const askContractToMintNft = async () => {
    if (isMinting) return;
    try {
      setMinting(true)
      setMintingResult(null)
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myEpicNft.abi, signer);
      let nftTxn = await connectedContract.mintNFT({ value: ethers.utils.parseEther("1") });
      await nftTxn.wait();
      console.log(nftTxn)
      console.log(`Mined, see transaction: https://polygonscan.com/tx/${nftTxn.hash}`);
      setMintingResult({ status: "success", hash: nftTxn.hash });
    } catch (error) {
      setMintingResult({ status: "error", message: error.message })
      console.log(error);
    } finally {
      setMinting(false)
    }
  }

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <p className="title">My NFT Collection</p>
          {mintingResult && mintingResult.status === "success" && (
            <SuccessTxn
              account={account}
              hash={mintingResult.hash}
              onClose={()=> setMintingResult(null)}
            />
          )}
          {mintingResult && mintingResult.status === "error" && (
            <FailedTxn
              error={mintingResult.message}
              onClose={()=> setMintingResult(null)}
            />
          )}
        </header>
        <main className="main">
          <div className="intro">
            <p className="text">Discover your NFT today.</p>
            {chain !== CONTRACT_CHAIN && (
              <p className="text">You are in the wrong blockchain.</p>
            )}
            {account && (
              <p className="text">You own {accountTokens} tokens</p>
            )}
          </div>
          {!account && (
            <button onClick={connectWallet} className="button connect-button">
              Connect to Wallet
            </button>
          )}
          {account && (
            <button 
              onClick={askContractToMintNft} 
              className="button mint-button" 
              disabled={isMinting || chain !== CONTRACT_CHAIN}
            >
              {isMinting ? "Minting NFT..." : "Mint NFT"}
            </button>
          )}
        </main>
        <footer className="footer">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href='https://twitter.com/ja_codes'
            target="_blank"
            rel="noreferrer"
          >
            built by @ja_codes
          </a>
        </footer>
      </div>
    </div>
  );
}

export default NFTView;