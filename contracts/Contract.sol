pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

// All the smart contract code for the AERS is in this file
contract Contract {
  // Mapping that stores the user type for each registered account address.
  // The user types are "patient", "medicalCompany", or "government"
  mapping(address => string) userTypes;

  // Gets the user type for an account address
  function getUserType(address _addr)
    public
    view
    returns (string memory userType)
  {
    return userTypes[_addr];
  }

  // Used to determine the next reportId for a new report
  uint256 public reportIndex = 0;

  // Action plan data type
  struct ActionPlan {
    string creator;
    string actionPlanCreationDate;
    string actionPlanDescription;
    string clinicalOutcome;
    string contributingFactors;
    string suspectedMedication;
    string actionToTake;
    string medicalCompanyInvolved;
    string ipfsHash;
  }

  // Report data type
  struct Report {
    uint256 reportId;
    string reporterFirstName;
    string reporterLastName;
    string incidentDate;
    string incidentDescription;
    string incidentCategory;
    string careSetting;
    string medicationTaken;
    string medicalCompanyInvolved;
    string ipfsHash;
    ActionPlan actionPlan;
    bool isResolved;
  }

  // Stores all the incident reports
  Report[] reports;

  // Used to determine the next id for a new government type user
  uint256 public governmentListIndex = 0;

  // Mapping that determines if an account at the specified address
  // is a government type account
  mapping(address => bool) isGovernment;

  // Government type user data type
  struct government {
    uint256 id;
    string name;
    string country;
    string phone;
    string email;
    string locationAddress;
    ActionPlan[] actionPlans;
    address addr;
    bool isApproved;
  }

  // Mapping that stores the government accounts based on their address
  mapping(address => government) governments;

  // Array that stores the addresses of all government accounts
  address[] public governmentList;

  // Adds a new government user
  function addGovernment(
    string memory _name,
    string memory _country,
    string memory _phone,
    string memory _email,
    string memory _locationAddress,
    address _addr
  ) public {
    require(!isGovernment[_addr], "Government is already registered");
    governmentList.push(_addr);
    isGovernment[_addr] = true;
    userTypes[_addr] = "government";
    governments[_addr].id = governmentListIndex;
    governments[_addr].name = _name;
    governments[_addr].country = _country;
    governments[_addr].phone = _phone;
    governments[_addr].email = _email;
    governments[_addr].locationAddress = _locationAddress;
    governments[_addr].addr = _addr;
    governments[_addr].isApproved = true;
    governmentListIndex = governmentListIndex + 1;
  }

  // Gets the profile information for a government user
  function getGovernmentProfile(address _address)
    public
    view
    returns (
      uint256 id,
      string memory name,
      string memory country,
      string memory phone,
      string memory email,
      string memory locationAddress,
      address addr,
      bool isApproved
    )
  {
    require(isGovernment[_address], "Government is not registered");
    government memory matchedEntry = governments[_address];
    return (
      matchedEntry.id,
      matchedEntry.name,
      matchedEntry.country,
      matchedEntry.phone,
      matchedEntry.email,
      matchedEntry.locationAddress,
      matchedEntry.addr,
      matchedEntry.isApproved
    );
  }

  // Adds an action plan to an existing report
  function addGovernmentActionPlan(
    address _addr,
    uint256 _reportId,
    string memory _actionPlanCreationDate,
    string memory _actionPlanDescription,
    string memory _clinicalOutcome,
    string memory _contributingFactors,
    string memory _suspectedMedication,
    string memory _actionToTake,
    string memory _medicalCompanyInvolved,
    string memory _ipfsHash
  ) public {
    require(isGovernment[_addr], "Government is not registered");
    reports[_reportId].actionPlan.creator = governments[_addr].name;
    reports[_reportId]
      .actionPlan
      .actionPlanCreationDate = _actionPlanCreationDate;
    reports[_reportId]
      .actionPlan
      .actionPlanDescription = _actionPlanDescription;
    reports[_reportId].actionPlan.clinicalOutcome = _clinicalOutcome;
    reports[_reportId].actionPlan.contributingFactors = _contributingFactors;
    reports[_reportId].actionPlan.suspectedMedication = _suspectedMedication;
    reports[_reportId].actionPlan.actionToTake = _actionToTake;
    reports[_reportId]
      .actionPlan
      .medicalCompanyInvolved = _medicalCompanyInvolved;
    reports[_reportId].actionPlan.ipfsHash = _ipfsHash;
  }

  // Used to determine the next id for a new medical company type user
  uint256 public medicalCompanyListIndex;

  // Mapping that determines if an account at the specified address
  // is a medical company type account
  mapping(address => bool) isMedicalCompany;

  // Mapping that determines if a report and corresponding action plan has been resolved
  // based on the reportId
  mapping(string => bool) resolvedActionPlans;

  // Medical company type user data type
  struct medicalCompany {
    uint256 id;
    string companyName;
    string companyType;
    string phone;
    string email;
    string locationAddress;
    address addr;
    bool isApproved;
  }

  // Mapping that stores the medical company accounts based on their address
  mapping(address => medicalCompany) medicalCompanies;

  // Array that stores the addresses of all medical company accounts
  address[] public medicalCompanyList;

  // Adds a new medical company user
  function addMedicalCompany(
    string memory _companyName,
    string memory _companyType,
    string memory _phone,
    string memory _email,
    string memory _locationAddress,
    address _addr
  ) public {
    require(!isMedicalCompany[_addr], "Medical company is already registered");
    medicalCompanyList.push(_addr);
    isMedicalCompany[_addr] = true;
    userTypes[_addr] = "medicalCompany";
    medicalCompanies[_addr] = medicalCompany(
      medicalCompanyListIndex,
      _companyName,
      _companyType,
      _phone,
      _email,
      _locationAddress,
      _addr,
      true
    );
    medicalCompanyListIndex = medicalCompanyListIndex + 1;
  }

  // Gets the profile information for a medical company user
  function getMedicalCompanyProfile(address _address)
    public
    view
    returns (
      uint256 id,
      string memory companyName,
      string memory companyType,
      string memory phone,
      string memory email,
      string memory locationAddress,
      address addr,
      bool isApproved
    )
  {
    require(isMedicalCompany[_address], "Medical company is not registered");
    medicalCompany memory matchedEntry = medicalCompanies[_address];
    return (
      matchedEntry.id,
      matchedEntry.companyName,
      matchedEntry.companyType,
      matchedEntry.phone,
      matchedEntry.email,
      matchedEntry.locationAddress,
      matchedEntry.addr,
      matchedEntry.isApproved
    );
  }

  // Resolves a report and corresponding action plan by the reportId
  function resolveActionPlan(address _address, uint256 _reportId) public {
    require(isMedicalCompany[_address], "Medical company is not registered");
    reports[_reportId].isResolved = true;
  }

  // Used to determine the next id for a new patient type user
  uint256 public patientListIndex = 0;

  // Patient type user data type
  struct patient {
    uint256 id;
    string firstName;
    string lastName;
    string phone;
    string email;
    string gender;
    string dateOfBirth;
    string bloodType;
    string homeAddress;
    address addr;
  }

  // Array that stores the addresses of all patient accounts
  address[] private patientList;

  // Mapping that stores the patient accounts based on their address
  mapping(address => patient) patients;

  // Mapping that determines if an account at the specified address
  // is a patient type account
  mapping(address => bool) isPatient;

  // Adds a new patient user
  function addPatient(
    string memory _firstName,
    string memory _lastName,
    string memory _phone,
    string memory _email,
    string memory _gender,
    string memory _dateOfBirth,
    string memory _bloodType,
    string memory _homeAddress
  ) public {
    require(!isPatient[msg.sender], "Patient is already registered");
    patientList.push(msg.sender);
    isPatient[msg.sender] = true;
    userTypes[msg.sender] = "patient";
    patients[msg.sender].id = patientListIndex;
    patients[msg.sender].firstName = _firstName;
    patients[msg.sender].lastName = _lastName;
    patients[msg.sender].phone = _phone;
    patients[msg.sender].email = _email;
    patients[msg.sender].gender = _gender;
    patients[msg.sender].dateOfBirth = _dateOfBirth;
    patients[msg.sender].bloodType = _bloodType;
    patients[msg.sender].homeAddress = _homeAddress;
    patients[msg.sender].addr = msg.sender;
    patientListIndex = patientListIndex + 1;
  }

  // Gets the profile information for a patient user
  function getPatientProfile(address _addr)
    public
    view
    returns (
      uint256 _id,
      string memory _firstName,
      string memory _lastName,
      string memory _phone,
      string memory _email,
      string memory _gender,
      string memory _dateOfBirth,
      string memory _bloodType,
      string memory _homeAddress
    )
  {
    require(isPatient[_addr], "Patient is not registered");
    patient memory matchedEntry = patients[_addr];
    return (
      matchedEntry.id,
      matchedEntry.firstName,
      matchedEntry.lastName,
      matchedEntry.phone,
      matchedEntry.email,
      matchedEntry.gender,
      matchedEntry.dateOfBirth,
      matchedEntry.bloodType,
      matchedEntry.homeAddress
    );
  }

  // Adds a new incident report
  function addPatientReport(
    address _addr,
    string memory _incidentDate,
    string memory _incidentDescription,
    string memory _incidentCategory,
    string memory _careSetting,
    string memory _medicationTaken,
    string memory _medicalCompanyInvolved,
    string memory _ipfsHash
  ) public {
    require(isPatient[_addr], "Patient is not registered");
    reports.push(
      Report(
        reportIndex,
        patients[_addr].firstName,
        patients[_addr].lastName,
        _incidentDate,
        _incidentDescription,
        _incidentCategory,
        _careSetting,
        _medicationTaken,
        _medicalCompanyInvolved,
        _ipfsHash,
        ActionPlan("", "", "", "", "", "", "", "", ""),
        false
      )
    );
    reportIndex = reportIndex + 1;
  }

  // Get all the incidents reports
  function getReports(address _addr)
    public
    view
    returns (Report[] memory _reports)
  {
    return reports;
  }

  // Get an incident report by its reportId
  function getReportById(address _addr, uint256 _reportId)
    public
    view
    returns (Report memory _report)
  {
    return reports[_reportId];
  }

  // Edits an incident report by its reportId
  function editPatientReport(
    address _addr,
    uint256 _reportId,
    string memory _incidentDate,
    string memory _incidentDescription,
    string memory _incidentCategory,
    string memory _careSetting,
    string memory _medicationTaken,
    string memory _medicalCompanyInvolved,
    string memory _ipfsHash
  ) public {
    require(isPatient[msg.sender], "Patient is not registered");
    reports[_reportId].incidentDate = _incidentDate;
    reports[_reportId].incidentDescription = _incidentDescription;
    reports[_reportId].incidentCategory = _incidentCategory;
    reports[_reportId].careSetting = _careSetting;
    reports[_reportId].medicationTaken = _medicationTaken;
    reports[_reportId].medicalCompanyInvolved = _medicalCompanyInvolved;
    reports[_reportId].ipfsHash = _ipfsHash;
  }

  // Get the names of all users
  function getAllNames(address _addr)
    public
    view
    returns (
      string[] memory _patientFirstNames,
      string[] memory _patientLastNames,
      string[] memory _medicalCompanyNames,
      string[] memory _governmentNames
    )
  {
    string[] memory patientFirstNames = new string[](patientList.length);
    string[] memory patientLastNames = new string[](patientList.length);
    string[] memory medicalCompanyNames = new string[](
      medicalCompanyList.length
    );
    string[] memory governmentNames = new string[](governmentList.length);
    for (uint256 i = 0; i < patientList.length; i++) {
      patientFirstNames[i] = patients[patientList[i]].firstName;
      patientLastNames[i] = patients[patientList[i]].lastName;
    }

    for (uint256 i = 0; i < medicalCompanyList.length; i++) {
      medicalCompanyNames[i] = medicalCompanies[medicalCompanyList[i]]
        .companyName;
    }

    for (uint256 i = 0; i < governmentList.length; i++) {
      governmentNames[i] = governments[governmentList[i]].name;
    }
    return (
      patientFirstNames,
      patientLastNames,
      medicalCompanyNames,
      governmentNames
    );
  }
}
