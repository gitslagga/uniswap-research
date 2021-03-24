import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers, ethers } from "ethers";

async function walletConnect() {
    //  Create WalletConnect Provider
    const provider = new WalletConnectProvider({
        infuraId: "2e650216fc774bff9de0ad22de006676"
    });

    //  Enable session (triggers QR Code modal)
    await provider.enable();

    // Subscribe to accounts change
    provider.on("accountsChanged", (accounts) => {
        console.log(accounts);
    });
    
    // Subscribe to chainId change
    provider.on("chainChanged", (chainId) => {
        console.log(chainId);
    });
    
    // Subscribe to session disconnection
    provider.on("disconnect", async (code, reason) => {
        console.log(code, reason);

        await provider.disconnect()
    });

    //  Wrap with Web3Provider from ethers.js
    const web3Provider = new providers.Web3Provider(provider);
    
    let address = provider.accounts[0];
    web3Provider.getBalance(address).then((balance) => {
        // 余额是 BigNumber (in wei); 格式化为 ether 字符串
        let etherString = ethers.utils.formatEther(balance);

        console.log("Balance: " + etherString);
    });

    web3Provider.getTransactionCount(address).then((transactionCount) => {
        console.log("发送交易总数: " + transactionCount);
    });

    web3Provider.getBlockNumber().then((blockNumber) => {
        console.log("Current block number: " + blockNumber);
    });
    
    web3Provider.getGasPrice().then((gasPrice) => {
        console.log("Current gas price: " + gasPrice.toString());
    });
}

export {
    walletConnect
}