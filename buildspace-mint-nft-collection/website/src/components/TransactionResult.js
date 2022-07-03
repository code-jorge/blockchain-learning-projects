
export const SuccessTxn = ({ account, hash, onClose })=> (
  <div className="transaction-result" data-status='success'>
    <p className="transaction-result-header">Success!</p>
    <p className="transaction-result-body">
      Your NFT has been minted. 
      <br />
      Check the{' '}
      <a href={`https://polygonscan.com/tx/${hash}`} target="_blank" rel="noreferrer">transaction</a>
      {' '} or view it in <a href={`https://opensea.io/${account}`} target="_blank" rel="noreferrer">OpenSea</a>.            
    </p>
    <button type="button" className='transaction-button' onClick={onClose}>Close</button>
  </div>
)

export const FailedTxn = ({ error, onClose })=> (
  <div className="transaction-result" data-status='error'>
    <p className="transaction-result-header">Failed!</p>
    <p className="transaction-result-body">{error}</p>
    <button type="button" className='transaction-button' onClick={onClose}>Close</button>
  </div>
)