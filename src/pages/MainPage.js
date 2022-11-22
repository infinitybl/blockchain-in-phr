import React, { useState, useEffect, useContext } from "react";
import UserTypeContext from "../context/UserTypeContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Rightbar from "../components/Rightbar";
import { Box, Stack } from "@mui/material";
import NavbarMain from "../components/NavbarMain";
import AddReport from "../components/AddReport";
import AddActionPlan from "../components/AddActionPlan";
import EditReport from "../components/EditReport";

import Web3Setup from "../web3";

import { encrypt, decrypt } from "../crypto";

function MainPage({ setMode, mode }) {
  const navigate = useNavigate();
  const [smartContract, setSmartContract] = useState(null);
  const [account, setAccount] = useState("");

  const [userType, setUserType] = useContext(UserTypeContext);

  const [addActionPlanModalOpen, setAddActionPlanModalOpen] = useState(false);
  const [editReportModalOpen, setEditReportModalOpen] = useState(false);

  const [patientFirstNames, setPatientFirstNames] = useState([]);
  const [patientLastNames, setPatientLastNames] = useState([]);
  const [medicalCompanyNames, setMedicalCompanyNames] = useState([]);
  const [governmentNames, setGovernmentNames] = useState([]);
  const [reports, setReports] = useState([]);

  const [searchText, setSearchText] = useState("");

  const [reportsFilterType, setReportsFilterType] = useState("all");

  useEffect(() => {
    if (!userType) {
      navigate("/");
    }
    async function setup() {
      const [smartContract, accounts] = await Web3Setup();
      setSmartContract(smartContract);
      setAccount(accounts[0]);
      console.log("Account: " + accounts[0]);
      const getAllNamesResponse = await smartContract.methods
        .getAllNames(accounts[0])
        .call({ from: accounts[0] });

      setPatientFirstNames(
        getAllNamesResponse["_patientFirstNames"].map((name) => decrypt(name))
      );
      setPatientLastNames(
        getAllNamesResponse["_patientLastNames"].map((name) => decrypt(name))
      );
      setMedicalCompanyNames(
        getAllNamesResponse["_medicalCompanyNames"].map((name) => decrypt(name))
      );
      setGovernmentNames(
        getAllNamesResponse["_governmentNames"].map((name) => decrypt(name))
      );

      const getReportsResponse = await smartContract.methods
        .getReports(accounts[0])
        .call({ from: accounts[0] });

      const reports = getReportsResponse.map((report) => ({
        reportId: decrypt(report[0]),
        reporterFirstName: decrypt(report[1]),
        reporterLastName: decrypt(report[2]),
        incidentDate: decrypt(report[3]),
        incidentDescription: decrypt(report[4]),
        incidentCategory: decrypt(report[5]),
        careSetting: decrypt(report[6]),
        medicationTaken: decrypt(report[7]),
        medicalCompanyInvolved: decrypt(report[8]),
        ipfsHash: decrypt(report[9]),
        actionPlan: {
          creator: decrypt(report[10][0]),
          actionPlanCreationDate: decrypt(report[10][1]),
          actionPlanDescription: decrypt(report[10][2]),
          clinicalOutcome: decrypt(report[10][3]),
          contributingFactors: decrypt(report[10][4]),
          suspectedMedication: decrypt(report[10][5]),
          actionToTake: decrypt(report[10][6]),
          medicalCompanyInvolved: decrypt(report[10][7]),
          ipfsHash: decrypt(report[10][8]),
        },
        isResolved: report[11],
      }));

      console.log("reports: " + JSON.stringify(reports, null, 2));
      setReports(reports);

      console.log(
        "getAllNamesResponse: " + JSON.stringify(getAllNamesResponse, null, 2)
      );
    }
    setup();
  }, []);

  useEffect(() => {
    async function fetchAndFilterActionPlans() {
      const [smartContract, accounts] = await Web3Setup();
      setSmartContract(smartContract);
      setAccount(accounts[0]);
      console.log("Account: " + accounts[0]);
      const getReportsResponse = await smartContract.methods
        .getReports(accounts[0])
        .call({ from: accounts[0] });

      let reports = getReportsResponse.map((report) => ({
        reportId: decrypt(report[0]),
        reporterFirstName: decrypt(report[1]),
        reporterLastName: decrypt(report[2]),
        incidentDate: decrypt(report[3]),
        incidentDescription: decrypt(report[4]),
        incidentCategory: decrypt(report[5]),
        careSetting: decrypt(report[6]),
        medicationTaken: decrypt(report[7]),
        medicalCompanyInvolved: decrypt(report[8]),
        ipfsHash: decrypt(report[9]),
        actionPlan: {
          creator: decrypt(report[10][0]),
          actionPlanCreationDate: decrypt(report[10][1]),
          actionPlanDescription: decrypt(report[10][2]),
          clinicalOutcome: decrypt(report[10][3]),
          contributingFactors: decrypt(report[10][4]),
          suspectedMedication: decrypt(report[10][5]),
          actionToTake: decrypt(report[10][6]),
          medicalCompanyInvolved: decrypt(report[10][7]),
          ipfsHash: decrypt(report[10][8]),
        },
        isResolved: report[11],
      }));

      console.log("reports: " + JSON.stringify(reports, null, 2));

      const lowerCaseSearchText = searchText.trim().toLowerCase();
      if (searchText) {
        console.log("searchText: " + searchText);
        reports = reports.filter((report) => {
          return (
            report.incidentDescription
              .toLowerCase()
              .includes(lowerCaseSearchText) ||
            report.actionPlan.actionPlanDescription
              .toLowerCase()
              .includes(lowerCaseSearchText)
          );
        });
      }

      if (reportsFilterType === "all") {
        setReports(reports);
      } else if (reportsFilterType === "no-action-plan") {
        setReports(reports.filter((report) => !report.actionPlan.creator));
      } else if (reportsFilterType === "has-action-plan") {
        setReports(reports.filter((report) => report.actionPlan.creator));
      } else if (reportsFilterType === "resolved") {
        setReports(reports.filter((report) => report.isResolved));
      }
    }
    fetchAndFilterActionPlans();
  }, [reportsFilterType, searchText]);

  return (
    <Box>
      <NavbarMain setSearchText={setSearchText} />
      <Stack
        direction={{ sm: "column", md: "row" }}
        spacing={2}
        justifyContent="space-between"
      >
        <Sidebar
          setMode={setMode}
          mode={mode}
          reportsFilterType={reportsFilterType}
          setReportsFilterType={setReportsFilterType}
        />
        <Feed
          reports={reports}
          addActionPlanModalOpen={addActionPlanModalOpen}
          setAddActionPlanModalOpen={setAddActionPlanModalOpen}
          editReportModalOpen={editReportModalOpen}
          setEditReportModalOpen={setEditReportModalOpen}
        />
        <Rightbar
          patientFirstNames={patientFirstNames}
          patientLastNames={patientLastNames}
          medicalCompanyNames={medicalCompanyNames}
          governmentNames={governmentNames}
        />
      </Stack>
      <Box
        sx={{
          marginTop: { xs: "50px", lg: 0 },
        }}
      >
        <AddReport
          medicalCompanyNames={medicalCompanyNames}
          setMode={setMode}
          mode={mode}
        />
        <AddActionPlan
          open={addActionPlanModalOpen}
          setOpen={setAddActionPlanModalOpen}
        />
        <EditReport
          open={editReportModalOpen}
          setOpen={setEditReportModalOpen}
        />
      </Box>
    </Box>
  );
}

export default MainPage;
