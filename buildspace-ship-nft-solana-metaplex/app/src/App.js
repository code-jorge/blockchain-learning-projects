import React, { useEffect, useState } from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';
import CandyMachine from './CandyMachine';

// Constants
const TWITTER_HANDLE = 'ja_codes';
const TWITTER_LINK = `https://twitter.com/ja_codes`;

const NotConnectedButton = ({ onClick }) => (
  <button
    className="cta-button connect-wallet-button"
    onClick={onClick}
  >
    Connect to Wallet
  </button>
);

const connectWallet = async ({ onlyIfTrusted=false }) => {
  const response = await window.solana.connect({ onlyIfTrusted });
  console.log('Connected with Public Key:', response.publicKey.toString());
  return response.publicKey.toString();
};

const checkIfWalletIsConnected = async () => {
  try {
    const { solana } = window;

    if (solana) {
      if (solana.isPhantom) {
        console.log('Phantom wallet found!');
        connectWallet({ onlyIfTrusted: true });
      }
    } else {
      alert('Solana object not found! Get a Phantom Wallet 👻');
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

const App = () => {

  const [walletAddress, setWalletAddress] = useState(null);

  useEffect(() => {
    const onLoad = async () => {
      const address = await checkIfWalletIsConnected();
      setWalletAddress(address);
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);


  const handleConnectWallet = async ()=> {
    const result = await connectWallet({});
    setWalletAddress(result);
  }

  console.log('walletAddress', walletAddress);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🍭 Candy Drop</p>
          <p className="sub-text">NFT drop machine with fair mint</p>
          {!walletAddress && <NotConnectedButton onClick={handleConnectWallet} />}
        </div>
        {walletAddress && <CandyMachine walletAddress={window.solana} />}
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built by @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
