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
import ReportIdContext from "../context/ReportIdContext";
import UserTypeContext from "../context/UserTypeContext";
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

const AddActionPlan = ({ open, setOpen }) => {
  const [smartContract, setSmartContract] = useState(null);
  const [account, setAccount] = useState("");

  const [userType, setUserType] = useContext(UserTypeContext);

  const [reportId, setReportId] = useContext(ReportIdContext);

  const [fileBuffer, setFileBuffer] = useState(null);

  const [selectedDate, setSelectedDate] = useState(new Date().toString());

  const handleDateChange = (newDate) => {
    console.log("newDate: " + newDate.toString());
    setSelectedDate(newDate.toString());
  };

  const [medicalCompanyInvolved, setMedicalCompanyInvolved] = useState("");

  const [creatorName, setCreatorName] = useState("");

  useEffect(() => {
    async function setup() {
      const [smartContract, accounts] = await Web3Setup();
      setSmartContract(smartContract);
      setAccount(accounts[0]);
      console.log("Account: " + account);
      if (userType === "government") {
        let response = await smartContract.methods
          .getGovernmentProfile(accounts[0])
          .call({ from: accounts[0] });
        setCreatorName(response["name"] ? decrypt(response["name"]) : "");
      }
    }
    setup();
  }, []);

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

  const handleAddActionPlanSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      let requestData = {};
      console.log({
        reportId: reportId,
        actionPlanCreationDate: selectedDate,
        actionPlanDescription: data.get("actionPlanDescription"),
        clinicalOutcome: data.get("clinicalOutcome"),
        contributingFactors: data.get("contributingFactors"),
        suspectedMedication: data.get("suspectedMedication"),
        actionToTake: data.get("actionToTake"),
        medicalCompanyInvolved: medicalCompanyInvolved,
      });
      requestData = {
        reportId: reportId,
        actionPlanCreationDate: encrypt(selectedDate),
        actionPlanDescription: encrypt(data.get("actionPlanDescription")),
        clinicalOutcome: encrypt(data.get("clinicalOutcome")),
        contributingFactors: encrypt(data.get("contributingFactors")),
        suspectedMedication: encrypt(data.get("suspectedMedication")),
        actionToTake: encrypt(data.get("actionToTake")),
        medicalCompanyInvolved: encrypt(medicalCompanyInvolved),
      };

      let ipfsHash = encrypt("");

      if (fileBuffer) {
        const { cid } = await ipfsClient.add(fileBuffer);
        let url = "https://ipfs.io/ipfs/" + cid;

        console.log("File url: " + url);

        ipfsHash = encrypt(url);
        console.log("Decrypted ipfsHash: " + decrypt(ipfsHash));
      }

      const response = await smartContract.methods
        .addGovernmentActionPlan(
          account,
          parseInt(requestData.reportId),
          requestData.actionPlanCreationDate,
          requestData.actionPlanDescription,
          requestData.clinicalOutcome,
          requestData.contributingFactors,
          requestData.suspectedMedication,
          requestData.actionToTake,
          requestData.medicalCompanyInvolved,
          ipfsHash
        )
        .send({ from: account });
      console.log(response);
    } catch (err) {
      console.log(err);
      alert("An error occured when adding a new action plan");
    }

    setOpen(false);
    window.location.reload(false);
  };

  return (
    <>
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
          onSubmit={handleAddActionPlanSubmit}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              variant="h6"
              color="gray"
              textAlign="center"
              sx={{ marginBottom: 2 }}
            >
              Create New Action Plan
            </Typography>
            <IconButton onClick={(e) => setOpen(false)}>
              <Close />
            </IconButton>
          </Box>
          <UserBox>
            <Typography fontWeight={600} variant="span">
              Creator:
            </Typography>
            <Avatar sx={{ width: 30, height: 30, bgcolor: "green" }}>
              {creatorName.charAt(0)}
            </Avatar>
            <Typography fontWeight={500} variant="span">
              {creatorName}
            </Typography>
          </UserBox>
          <TextField
            margin="normal"
            sx={{ width: "100%", marginBottom: 2 }}
            id="standard-multiline-static"
            multiline
            rows={3}
            name="actionPlanDescription"
            label="Action Plan Desciption"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <DateTimePicker
            label="Action Plan Creation Date"
            value={selectedDate}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
          <TextField
            margin="normal"
            sx={{ width: "100%", marginBottom: 2 }}
            id="outlined-basic"
            name="clinicalOutcome"
            label="Clinical Outcome"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="normal"
            sx={{ width: "100%", marginBottom: 2 }}
            id="outlined-basic"
            name="contributingFactors"
            label="Contributing Factors"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="normal"
            sx={{ width: "100%", marginBottom: 2 }}
            id="outlined-basic"
            name="suspectedMedication"
            label="Suspected Medication"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="normal"
            sx={{ width: "100%", marginBottom: 2 }}
            id="standard-multiline-static"
            multiline
            rows={3}
            name="actionToTake"
            label="Action To Take By Medical Company"
            InputLabelProps={{
              shrink: true,
            }}
          />
          {/* <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Medical Company Involved
            </InputLabel>
            <NativeSelect
              defaultValue={"rexall"}
              inputProps={{
                name: "medical-company-involved",
                id: "uncontrolled-native",
              }}
              onChange={(e) => {
                e.preventDefault();
                setMedicalCompanyInvolved(e.target.value);
              }}
            >
              <option value={"rexall"}>Rexall Pharmacy</option>
            </NativeSelect>
          </FormControl> */}
          <TextField
            sx={{ marginTop: 4 }}
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
              Create
            </Button>
          </ButtonGroup>
        </Box>
      </StyledModal>
    </>
  );
};

export default AddActionPlan;
