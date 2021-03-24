import logo from './logo.svg';
import './App.css';
import {getPriceInfo, getPriceImpact} from './uniswap_sdk'
import {contractUsage} from './contract_usage'
import {walletConnect} from './wallet_connect'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={getPriceInfo}>getPriceInfo</button>
        <button onClick={getPriceImpact}>getPriceImpact</button>
        <button onClick={contractUsage}>contractUsage</button>
        <button onClick={walletConnect}>walletConnect</button>
      </header>
    </div>
  );
}

export default App;
