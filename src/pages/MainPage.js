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

  useEffect(() => {
    async function setup() {
      const [smartContract, accounts] = await Web3Setup();
      setSmartContract(smartContract);
      setAccount(accounts[0]);
      console.log("Account: " + accounts[0]);
      const response = await smartContract.methods
        .getReports(accounts[0])
        .call({ from: accounts[0] });

      const reports = response.map((report) => ({
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
    }
    setup();
  }, []);

  return (
    <Box>
      <NavbarMain />
      <Stack
        direction={{ sm: "column", md: "row" }}
        spacing={2}
        justifyContent="space-between"
      >
        <Sidebar setMode={setMode} mode={mode} />
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
