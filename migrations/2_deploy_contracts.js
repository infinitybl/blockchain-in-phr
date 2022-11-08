var Government = artifacts.require("Government");
var MedicalCompany = artifacts.require("MedicalCompany");
var Patient = artifacts.require("Patient");

module.exports = function (deployer) {
  deployer.deploy(Government);
  deployer.deploy(MedicalCompany);
  deployer.deploy(Patient);
};
