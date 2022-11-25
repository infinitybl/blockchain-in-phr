import React, { useState, useEffect, useContext } from "react";

import UserTypeContext from "../context/UserTypeContext";
import ReportIdContext from "../context/ReportIdContext";

import Web3Setup from "../web3";

import {
  MoreVert,
  MedicalServices,
  Edit,
  Summarize,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  responsiveFontSizes,
  Tooltip,
  Typography,
} from "@mui/material";

const ReportCard = ({
  reportIdNumber,
  reporterFirstName,
  reporterLastName,
  incidentDescription,
  incidentDate,
  incidentCategory,
  careSetting,
  medicationTaken,
  medicalCompanyInvolved,
  file,
  actionPlan,
  isResolved,
  addActionPlanModalOpen,
  setAddActionPlanModalOpen,
  editReportModalOpen,
  setEditReportModalOpen,
}) => {
  const [smartContract, setSmartContract] = useState(null);
  const [account, setAccount] = useState("");
  const [userType, setUserType] = useContext(UserTypeContext);
  const [reportId, setReportId] = useContext(ReportIdContext);

  useEffect(() => {
    async function setup() {
      const [smartContract, accounts] = await Web3Setup();
      setSmartContract(smartContract);
      setAccount(accounts[0]);
      console.log("Account: " + accounts[0]);
    }
    setup();
  }, []);

  const resolveActionPlan = async (event) => {
    event.preventDefault();
    console.log("reportId" + reportIdNumber);
    if (reportIdNumber) {
      const response = await smartContract.methods
        .resolveActionPlan(account, parseInt(reportIdNumber))
        .send({ from: account });
      console.log(response);
      console.log("Action plan resolved!");
    }

    window.location.reload(false);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        marginLeft: { xs: 2, md: 10 },
        marginTop: { xs: 0, md: 1 },
        marginBottom: { xs: 0, md: 4 },
        marginRight: { xs: 2, md: 0 },
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="report">
            {reporterFirstName.charAt(0) + reporterLastName.charAt(0)}
          </Avatar>
        }
        action={
          (userType === "patient" && !isResolved && (
            <Tooltip title="Edit Report">
              <IconButton
                aria-label="edit report"
                onClick={(e) => {
                  setEditReportModalOpen(true);
                  setReportId(reportIdNumber);
                }}
              >
                <Edit />
              </IconButton>
            </Tooltip>
          )) ||
          (userType === "government" && (
            <Tooltip
              title="Create Action Plan"
              onClick={(e) => {
                setAddActionPlanModalOpen(true);
                setReportId(reportIdNumber);
              }}
            >
              <IconButton aria-label="create action plan">
                <Summarize />
              </IconButton>
            </Tooltip>
          )) ||
          (userType === "medicalCompany" && !isResolved && (
            <Tooltip
              title="Resolve Action Plan"
              onClick={(e) => {
                setReportId(reportIdNumber);
                resolveActionPlan(e);
              }}
            >
              <IconButton aria-label="resolve action plan">
                <MedicalServices />
              </IconButton>
            </Tooltip>
          ))
        }
        title={reporterFirstName + " " + reporterLastName}
      />
      <CardContent>
        {isResolved && (
          <Typography variant="h6" align="center" color="orange">
            RESOLVED
          </Typography>
        )}
        <Typography variant="h6" align="center">
          Report Details
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <br />
          <strong>Incident Date:</strong> {incidentDate}
          <br />
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <br />
          <strong>Incident Category:</strong> {incidentCategory}
          <br />
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <br />
          <strong>Care Setting:</strong> {careSetting}
          <br />
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <br />
          <strong>Medication Taken:</strong> {medicationTaken}
          <br />
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <br />
          <strong>Medical Company Involved:</strong> {medicalCompanyInvolved}
          <br />
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <br />
          <strong>Incident Description:</strong>
          <br />
          {incidentDescription}
          <br />
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <br />
          <strong>URL to Related File: </strong>
          <br />
          <a href={file} target="_blank">
            {file}
          </a>
        </Typography>
        {actionPlan.creator && (
          <>
            <br />
            <hr />
            <br />
            <Typography variant="h6" align="center">
              Action Plan Details
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <br />
              <strong>Creator:</strong> {actionPlan.creator}
              <br />
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <br />
              <strong>Creation Date:</strong>{" "}
              {actionPlan.actionPlanCreationDate}
              <br />
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <br />
              <strong>Clinical Outcome:</strong> {actionPlan.clinicalOutcome}
              <br />
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <br />
              <strong>Contributing Factors:</strong>{" "}
              {actionPlan.contributingFactors}
              <br />
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <br />
              <strong>Suspected Medication:</strong>{" "}
              {actionPlan.suspectedMedication}
              <br />
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <br />
              <strong>Action To Take:</strong> {actionPlan.actionToTake}
              <br />
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <br />
              <strong>Action Plan Description:</strong>
              <br />
              {actionPlan.actionPlanDescription}
              <br />
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <br />
              <strong>URL to Related File: </strong>
              <br />
              <a href={actionPlan.ipfsHash} target="_blank">
                {actionPlan.ipfsHash}
              </a>
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ReportCard;
