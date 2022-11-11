import Web3 from "web3";
import Government from "./abis/Government.json";
import MedicalCompany from "./abis/MedicalCompany.json";
import Patient from "./abis/Patient.json";

async function Web3Setup() {
  await window.ethereum.enable();
  const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
  const accounts = await web3.eth.getAccounts();
  const networkId = await web3.eth.net.getId();
  console.log(JSON.stringify(accounts, null, 2));
  console.log("networkId: " + (await web3.eth.net.getId()));
  const governmentNetworkData = Government.networks[networkId];
  const medicalCompanyNetworkData = MedicalCompany.networks[networkId];
  const patientNetworkData = Patient.networks[networkId];
  if (
    !governmentNetworkData ||
    !medicalCompanyNetworkData ||
    !patientNetworkData
  ) {
    alert(
      "Wrong Network ID! Please make sure you are connected to the correct Blockchain network"
    );
  }
  const governmentContract = await new web3.eth.Contract(
    Government.abi,
    governmentNetworkData.address
  );
  const medicalCompanyContract = await new web3.eth.Contract(
    MedicalCompany.abi,
    medicalCompanyNetworkData.address
  );
  const patientContract = await new web3.eth.Contract(
    Patient.abi,
    patientNetworkData.address
  );

  const contracts = {
    governmentContract,
    medicalCompanyContract,
    patientContract,
  };

  return [contracts, accounts];
}

export default Web3Setup;
