import Web3 from "web3";
import Contract from "./abis/Contract.json";

async function Web3Setup() {
  await window.ethereum.enable();
  const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
  const accounts = await web3.eth.getAccounts();
  const networkId = await web3.eth.net.getId();
  console.log(JSON.stringify(accounts, null, 2));
  console.log("networkId: " + (await web3.eth.net.getId()));
  const networkData = Contract.networks[networkId];
  if (!networkData) {
    alert(
      "Wrong Network ID! Please make sure you are connected to the correct Blockchain network"
    );
  }
  const smartContract = await new web3.eth.Contract(
    Contract.abi,
    networkData.address
  );

  return [smartContract, accounts];
}

export default Web3Setup;
