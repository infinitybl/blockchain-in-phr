pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

contract Government {
  uint256 public governmentListIndex;
  mapping(address => bool) isGovernment;

  struct ActionPlan {
    string creator;
    string reportId;
    string actionPlanCreationDate;
    string actionPlanDescription;
    string clinicalOutcome;
    string contributingFactors;
    string suspectedMedication;
    string actionToTake;
    string medicalCompanyInvolved;
    string ipfsHash;
    bool resolved;
  }

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

  mapping(address => government) governments;
  address[] public governmentList;

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
    governmentListIndex = governmentListIndex + 1;
    isGovernment[_addr] = true;
    governments[_addr].id = governmentListIndex;
    governments[_addr].name = _name;
    governments[_addr].country = _country;
    governments[_addr].phone = _phone;
    governments[_addr].email = _email;
    governments[_addr].locationAddress = _locationAddress;
    governments[_addr].addr = _addr;
    governments[_addr].isApproved = true;
  }

  function getAllGovernmentAddresses() public view returns (address[] memory) {
    return governmentList;
  }

  function getGovernmentById(uint256 _id)
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
    uint256 i = 0;
    for (; i < governmentList.length; i++) {
      if (governments[governmentList[i]].id == _id) {
        break;
      }
    }
    require(
      governments[governmentList[i]].id == _id,
      "Government could not be found with the given ID"
    );
    government memory matchedEntry = governments[governmentList[i]];
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
    require(
      governments[_address].isApproved,
      "Government is not approved or government does not exist"
    );
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

  function addGovernmentActionPlan(
    address _addr,
    string memory _reportId,
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
    governments[_addr].actionPlans.push(
      ActionPlan(
        governments[_addr].name,
        _reportId,
        _actionPlanCreationDate,
        _actionPlanDescription,
        _clinicalOutcome,
        _contributingFactors,
        _suspectedMedication,
        _actionToTake,
        _medicalCompanyInvolved,
        _ipfsHash,
        false
      )
    );
  }

  function getGovernmentActionPlans(address _addr)
    public
    view
    returns (ActionPlan[] memory _actionPlans)
  {
    require(isGovernment[_addr], "Government is not registered");
    require(
      governments[_addr].actionPlans.length > 0,
      "Government does not have any action plans"
    );
    return (governments[_addr].actionPlans);
  }
}

contract MedicalCompany {
  uint256 public medicalCompanyListIndex;

  mapping(address => bool) isMedicalCompany;

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

  mapping(address => medicalCompany) medicalCompanies;
  address[] public medicalCompanyList;

  function addMedicalCompany(
    string memory _companyName,
    string memory _companyType,
    string memory _phone,
    string memory _email,
    string memory _locationAddress,
    address _addr
  ) public {
    require(!isMedicalCompany[_addr], "MedicalCompany is already registered");
    medicalCompanyList.push(_addr);
    medicalCompanyListIndex = medicalCompanyListIndex + 1;
    isMedicalCompany[_addr] = true;
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
  }

  function getAllMedicalCompanyAddresses()
    public
    view
    returns (address[] memory)
  {
    return medicalCompanyList;
  }

  function getMedicalCompanyById(uint256 _id)
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
    uint256 i = 0;
    for (; i < medicalCompanyList.length; i++) {
      if (medicalCompanies[medicalCompanyList[i]].id == _id) {
        break;
      }
    }
    require(
      medicalCompanies[medicalCompanyList[i]].id == _id,
      "MedicalCompany could not be found with the given ID"
    );
    medicalCompany memory matchedEntry = medicalCompanies[
      medicalCompanyList[i]
    ];
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
    require(
      medicalCompanies[_address].isApproved,
      "MedicalCompany is not approved or medicalCompany does not exist"
    );
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
}

contract Patient {
  uint256 public patientListIndex = 0;
  uint256 public reportIndex = 0;

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
  }

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
    Report[] reports;
    address addr;
  }

  address[] private patientList;
  // mapping(address => mapping(address => bool)) isAuth;
  mapping(address => patient) patients;
  mapping(address => bool) isPatient;

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
    patientListIndex = patientListIndex + 1;
    isPatient[msg.sender] = true;
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
  }

  function getAllPatientAddresses() public view returns (address[] memory) {
    return patientList;
  }

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
    reportIndex = reportIndex + 1;
    patients[_addr].reports.push(
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
        _ipfsHash
      )
    );
  }

  function getPatientReports(address _addr)
    public
    view
    returns (Report[] memory _reports)
  {
    require(isPatient[_addr], "Patient is not registered");
    require(
      patients[_addr].reports.length > 0,
      "Patient does not have any reports"
    );
    return (patients[_addr].reports);
  }
}
