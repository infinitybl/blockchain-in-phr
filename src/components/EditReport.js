import {
  Avatar,
  Button,
  ButtonGroup,
  Fab,
  FormControl,
  IconButton,
  InputLabel,
  Modal,
  NativeSelect,
  styled,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import UserTypeContext from "../context/UserTypeContext";
import ReportIdContext from "../context/ReportIdContext";
import { useNavigate } from "react-router-dom";
import {
  Add as AddIcon,
  Close,
  DateRange,
  FilePresent,
} from "@mui/icons-material";
import { Box } from "@mui/system";

import moment from "moment";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import Web3Setup from "../web3";

import ipfsClient from "../ipfs";
import { Buffer } from "buffer";

import { encrypt, decrypt } from "../crypto";
import { report } from "process";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "20px",
});

const EditReport = ({ medicalCompanyNames, open, setOpen }) => {
  const navigate = useNavigate();
  const [smartContract, setSmartContract] = useState(null);
  const [account, setAccount] = useState("");

  const [userType, setUserType] = useContext(UserTypeContext);
  const [reportId, setReportId] = useContext(ReportIdContext);

  const [report, setReport] = useState([]);
  const [reporterFirstName, setReporterFirstName] = useState("");
  const [reporterLastName, setReporterLastName] = useState("");

  const [fileBuffer, setFileBuffer] = useState(null);

  const [selectedDate, setSelectedDate] = useState(new Date().toString());

  const handleDateChange = (newDate) => {
    console.log("newDate: " + newDate.toString());
    setSelectedDate(newDate.toString());
  };

  const [medicalCompanyInvolved, setMedicalCompanyInvolved] = useState("");

  useEffect(() => {
    async function setup() {
      const [smartContract, accounts] = await Web3Setup();
      setSmartContract(smartContract);
      setAccount(accounts[0]);
      console.log("Account: " + account);
    }
    setup();
  }, []);

  useEffect(() => {
    async function getReport() {
      if (reportId) {
        let response = await smartContract.methods
          .getReportById(account, reportId)
          .call({ from: account });
        setReport(response);
        setReporterFirstName(response[1] ? decrypt(response[1]) : "");
        setReporterLastName(response[2] ? decrypt(response[2]) : "");
        setSelectedDate(response[3] ? decrypt(response[3]) : "");
        setMedicalCompanyInvolved(response[8] ? decrypt(response[8]) : "");
        console.log(JSON.stringify(response, null, 2));
      }
    }
    getReport();
  }, [reportId]);

  useEffect(() => {
    setMedicalCompanyInvolved(
      medicalCompanyNames[0] ? medicalCompanyNames[0] : ""
    );
  }, [medicalCompanyNames]);

  const captureFile = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const file = e.target.files[0];
    let fileReader = new window.FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onloadend = () => convertToBuffer(fileReader);
  };

  const convertToBuffer = async (reader) => {
    const buffer = await Buffer.from(reader.result);
    setFileBuffer(buffer);
    console.log("fileBuffer: " + fileBuffer);
  };

  const handleEditReportSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      let requestData = {};
      console.log({
        reportId: reportId,
        incidentDate: selectedDate,
        incidentDescription: data.get("incidentDescription"),
        incidentCategory: data.get("incidentCategory"),
        careSetting: data.get("careSetting"),
        medicationTaken: data.get("medicationTaken"),
        medicalCompanyInvolved: medicalCompanyInvolved,
      });
      requestData = {
        reportId: reportId,
        incidentDate: encrypt(selectedDate),
        incidentDescription: encrypt(data.get("incidentDescription")),
        incidentCategory: encrypt(data.get("incidentCategory")),
        careSetting: encrypt(data.get("careSetting")),
        medicationTaken: encrypt(data.get("medicationTaken")),
        medicalCompanyInvolved: encrypt(medicalCompanyInvolved),
      };

      let ipfsHash = "";

      if (fileBuffer) {
        const { cid } = await ipfsClient.add(fileBuffer);
        let url = "https://ipfs.io/ipfs/" + cid;

        console.log("File url: " + url);

        ipfsHash = encrypt(url);

        console.log("Decrypted ipfsHash: " + decrypt(ipfsHash));
      } else {
        ipfsHash = report[9] ? decrypt(report[9]) : "";
      }

      const response = await smartContract.methods
        .editPatientReport(
          account,
          parseInt(requestData.reportId),
          requestData.incidentDate,
          requestData.incidentDescription,
          requestData.incidentCategory,
          requestData.careSetting,
          requestData.medicationTaken,
          requestData.medicalCompanyInvolved,
          ipfsHash
        )
        .send({ from: account });
      console.log(response);
    } catch (err) {
      console.log(err);
      alert("An error occured when editing an incident report");
    }

    setOpen(false);
    window.location.reload(false);
  };

  return (
    <>
      {!open && (
        <>
          <Tooltip
            onClick={(e) => setOpen(true)}
            title="Add"
            sx={{
              position: "fixed",
              bottom: 20,
              left: 20,
            }}
          >
            <Fab color="primary" aria-label="add" variant="extended">
              <AddIcon />
              <Typography
                variant="span"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                Edit Incident Report
              </Typography>
            </Fab>
          </Tooltip>
        </>
      )}
      <StyledModal
        open={open}
        onClose={(e) => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          maxWidth={"600px"}
          maxHeight={"600px"}
          bgcolor={"background.default"}
          color={"text.primary"}
          p={3}
          borderRadius={1}
          sx={{ overflow: "auto" }}
          component="form"
          noValidate
          onSubmit={handleEditReportSubmit}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              variant="h6"
              color="gray"
              textAlign="center"
              sx={{ marginBottom: 2 }}
            >
              Edit Incident Report
            </Typography>
            <IconButton onClick={(e) => setOpen(false)}>
              <Close />
            </IconButton>
          </Box>
          <UserBox>
            <Typography fontWeight={600} variant="span">
              Reporter:
            </Typography>
            <Avatar sx={{ width: 30, height: 30, bgcolor: "red" }}>
              {reporterFirstName.charAt(0) + reporterLastName.charAt(0)}
            </Avatar>
            <Typography fontWeight={500} variant="span">
              {reporterFirstName} {reporterLastName}
            </Typography>
          </UserBox>
          <TextField
            margin="normal"
            sx={{ width: "100%", marginBottom: 2 }}
            id="standard-multiline-static"
            multiline
            rows={3}
            name="incidentDescription"
            label="Incident Desciption"
            defaultValue={report[4] ? decrypt(report[4]) : ""}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <DateTimePicker
            label="Incident Date"
            value={selectedDate}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
          <TextField
            margin="normal"
            sx={{ width: "100%", marginBottom: 2 }}
            id="outlined-basic"
            name="incidentCategory"
            label="Incident Category"
            defaultValue={report[5] ? decrypt(report[5]) : ""}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="normal"
            sx={{ width: "100%", marginBottom: 2 }}
            id="outlined-basic"
            name="careSetting"
            label="Care Setting"
            defaultValue={report[6] ? decrypt(report[6]) : ""}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="normal"
            sx={{ width: "100%", marginBottom: 2 }}
            id="outlined-basic"
            name="medicationTaken"
            label="Medication Taken"
            defaultValue={report[7] ? decrypt(report[7]) : ""}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Medical Company Involved
            </InputLabel>
            <NativeSelect
              defaultValue={medicalCompanyInvolved}
              value={medicalCompanyInvolved}
              inputProps={{
                name: "medicalCompanyInvolved",
                id: "uncontrolled-native",
              }}
              disabled
            >
              {medicalCompanyNames.map((name, i) => (
                <option key={i} value={name}>
                  {name}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
          <Typography sx={{ marginTop: 4 }}>
            Note: If you do not upload a file, the existing file won't change
          </Typography>
          <TextField
            sx={{ marginTop: 2 }}
            name="file"
            type="file"
            label="Upload File"
            InputLabelProps={{ shrink: true }}
            onChange={captureFile}
          ></TextField>
          <ButtonGroup
            fullWidth
            variant="contained"
            aria-label="outlined primary button group"
            sx={{ marginTop: 3 }}
          >
            <Button type="submit" fullWidth>
              Edit
            </Button>
          </ButtonGroup>
        </Box>
      </StyledModal>
    </>
  );
};

export default EditReport;
