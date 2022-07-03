import React from 'react';
import ReactDOM from 'react-dom';
import NFTView from './components/NFTView';
import { Web3IdentityProvider } from './components/Web3IdentityContext';
import './styles/index.css';

ReactDOM.render(
  <React.StrictMode>
    <Web3IdentityProvider>
      <NFTView />
    </Web3IdentityProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
