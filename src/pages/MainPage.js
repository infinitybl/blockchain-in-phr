import React, { useState, useEffect, useContext } from "react";
import UserTypeContext from "../context/UserTypeContext";
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
  const [smartContract, setSmartContract] = useState(null);
  const [account, setAccount] = useState("");

  const [userType, setUserType] = useContext(UserTypeContext);

  const [addActionPlanModalOpen, setAddActionPlanModalOpen] = useState(false);
  const [editReportModalOpen, setEditReportModalOpen] = useState(false);

  const [reports, setReports] = useState([]);

  const [searchText, setSearchText] = useState("");

  const [reportsFilterType, setReportsFilterType] = useState("all");

  useEffect(() => {
    async function setup() {
      const [smartContract, accounts] = await Web3Setup();
      setSmartContract(smartContract);
      setAccount(accounts[0]);
      console.log("Account: " + accounts[0]);
      const getReportsResponse = await smartContract.methods
        .getReports(accounts[0])
        .call({ from: accounts[0] });

      const reports = getReportsResponse.map((report) => ({
        reportId: report[0],
        reporterFirstName: report[1],
        reporterLastName: report[2],
        incidentDate: report[3],
        incidentDescription: report[4],
        incidentCategory: report[5],
        careSetting: report[6],
        medicationTaken: report[7],
        medicalCompanyInvolved: report[8],
        ipfsHash: decrypt(report[9]),
        actionPlan: {
          creator: report[10][0],
          actionPlanCreationDate: report[10][1],
          actionPlanDescription: report[10][2],
          clinicalOutcome: report[10][3],
          contributingFactors: report[10][4],
          suspectedMedication: report[10][5],
          actionToTake: report[10][6],
          medicalCompanyInvolved: report[10][7],
          ipfsHash: decrypt(report[10][8]),
        },
        isResolved: report[11],
      }));

      console.log("reports: " + JSON.stringify(reports, null, 2));
      setReports(reports);

      const getAllNamesResponse = await smartContract.methods
        .getAllNames(accounts[0])
        .call({ from: accounts[0] });

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
        reportId: report[0],
        reporterFirstName: report[1],
        reporterLastName: report[2],
        incidentDate: report[3],
        incidentDescription: report[4],
        incidentCategory: report[5],
        careSetting: report[6],
        medicationTaken: report[7],
        medicalCompanyInvolved: report[8],
        ipfsHash: decrypt(report[9]),
        actionPlan: {
          creator: report[10][0],
          actionPlanCreationDate: report[10][1],
          actionPlanDescription: report[10][2],
          clinicalOutcome: report[10][3],
          contributingFactors: report[10][4],
          suspectedMedication: report[10][5],
          actionToTake: report[10][6],
          medicalCompanyInvolved: report[10][7],
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
        <Rightbar />
      </Stack>
      <Box
        sx={{
          marginTop: { xs: "50px", lg: 0 },
        }}
      >
        <AddReport setMode={setMode} mode={mode} />
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
