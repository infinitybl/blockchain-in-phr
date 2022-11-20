import React, { useState, useEffect, useContext } from "react";
import UserTypeContext from "../context/UserTypeContext";

import { useNavigate } from "react-router-dom";

import {
  Avatar,
  Button,
  ButtonGroup,
  CssBaseline,
  TextField,
  FormControlLabel,
  FormControl,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  InputLabel,
  NativeSelect,
} from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { LockOutlined } from "@mui/icons-material";

import Navbar from "../components/Navbar";

import moment from "moment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { MuiTelInput } from "mui-tel-input";

import Web3Setup from "../web3";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Signup() {
  const navigate = useNavigate();
  const [contracts, setContracts] = useState(null);
  const [account, setAccount] = useState("");

  const [userType, setUserType] = useContext(UserTypeContext);
  const [phone, setPhone] = useState("");

  const handlePhoneChange = (newPhone) => {
    setPhone(newPhone);
  };

  const [selectedDate, setSelectedDate] = useState(moment());

  const handleDateChange = (newDate) => {
    console.log("newDate: " + newDate.toString());
    setSelectedDate(newDate.toString());
  };

  const [bloodType, setBloodType] = useState("O-");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let requestData = {};
    if (userType === "patient") {
      console.log({
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        phone: phone,
        email: data.get("email"),
        gender: data.get("gender"),
        dateOfBirth: selectedDate,
        bloodType: bloodType,
        homeAddress: data.get("homeAddress"),
      });
      requestData = {
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        phone: phone,
        email: data.get("email"),
        gender: data.get("gender"),
        dateOfBirth: selectedDate,
        bloodType: bloodType,
        homeAddress: data.get("homeAddress"),
      };
      try {
        const response = await contracts.patientContract.methods
          .addPatient(
            requestData.firstName,
            requestData.lastName,
            requestData.phone,
            requestData.email,
            requestData.gender,
            requestData.dateOfBirth,
            requestData.bloodType,
            requestData.homeAddress
          )
          .send({ from: account });
        console.log(response);
        navigate("/main");
      } catch (e) {
        alert("Error");
      }
    } else if (userType === "medicalCompany") {
      console.log({
        companyName: data.get("companyName"),
        companyType: data.get("companyType"),
        phone: phone,
        email: data.get("email"),
        locationAddress: data.get("locationAddress"),
      });
      requestData = {
        companyName: data.get("companyName"),
        companyType: data.get("companyType"),
        phone: phone,
        email: data.get("email"),
        locationAddress: data.get("locationAddress"),
      };
      try {
        const response = await contracts.medicalCompanyContract.methods
          .addMedicalCompany(
            requestData.companyName,
            requestData.companyType,
            requestData.phone,
            requestData.email,
            requestData.locationAddress,
            account
          )
          .send({ from: account });
        console.log(response);
        navigate("/main");
      } catch (e) {
        alert("Error");
      }
    } else if (userType === "government") {
      console.log({
        name: data.get("healthMinistryName"),
        country: data.get("country"),
        phone: phone,
        email: data.get("email"),
        locationAddress: data.get("locationAddress"),
      });
      requestData = {
        name: data.get("healthMinistryName"),
        country: data.get("country"),
        phone: phone,
        email: data.get("email"),
        locationAddress: data.get("locationAddress"),
      };
      try {
        const response = await contracts.governmentContract.methods
          .addGovernment(
            requestData.name,
            requestData.country,
            requestData.phone,
            requestData.email,
            requestData.locationAddress,
            account
          )
          .send({ from: account });
        console.log(response);
        navigate("/main");
      } catch (e) {
        alert("Error");
      }
    }
  };

  useEffect(() => {
    async function setup() {
      const [contracts, accounts] = await Web3Setup();
      setContracts(contracts);
      setAccount(accounts[0]);
      console.log("Account: " + account);
    }
    setup();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box sx={{ marginTop: 2 }}>
            <InputLabel variant="standard">Select User Type</InputLabel>
            <ButtonGroup disableElevation variant="contained" color="primary">
              <Button
                color={userType === "patient" ? "secondary" : "primary"}
                onClick={() => setUserType("patient")}
              >
                Patient
              </Button>
              <Button
                color={userType === "medicalCompany" ? "secondary" : "primary"}
                onClick={() => setUserType("medicalCompany")}
              >
                Medical Company
              </Button>
              <Button
                color={userType === "government" ? "secondary" : "primary"}
                onClick={() => setUserType("government")}
              >
                Health Ministry
              </Button>
            </ButtonGroup>
          </Box>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              {/* <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="metamask-wallet-address"
                  name="metaMaskWalletAddress"
                  label="MetaMask Wallet Address"
                  autoComplete="metamask-wallet-address"
                />
              </Grid> */}
              {userType === "patient" && (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <DatePicker
                      label="Date of Birth"
                      value={selectedDate}
                      onChange={handleDateChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MuiTelInput
                      label="Phone Number"
                      value={phone}
                      onChange={handlePhoneChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      name="email"
                      label="Email Address"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="gender"
                      name="gender"
                      label="Gender"
                      autoComplete="gender"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="home-address"
                      name="homeAddress"
                      label="Home Address"
                      autoComplete="home-address"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel
                        variant="standard"
                        htmlFor="uncontrolled-native"
                      >
                        Blood Type
                      </InputLabel>
                      <NativeSelect
                        defaultValue={bloodType}
                        inputProps={{
                          name: "bloodType",
                          id: "uncontrolled-native",
                        }}
                        onChange={(e) => {
                          e.preventDefault();
                          setBloodType(e.target.value);
                        }}
                      >
                        <option value={"O-"}>O-</option>
                        <option value={"O+"}>O+</option>
                        <option value={"A-"}>A-</option>
                        <option value={"A+"}>A+</option>
                        <option value={"B-"}>B-</option>
                        <option value={"B+"}>B+</option>
                        <option value={"AB-"}>AB-</option>
                        <option value={"AB+"}>AB+</option>
                      </NativeSelect>
                    </FormControl>
                  </Grid>
                </>
              )}
              {userType === "medicalCompany" && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="company-name"
                      name="companyName"
                      required
                      fullWidth
                      id="companyName"
                      label="Company Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="company-type"
                      name="companyType"
                      required
                      fullWidth
                      id="companyType"
                      label="Company Type"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MuiTelInput
                      label="Phone Number"
                      value={phone}
                      onChange={handlePhoneChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      name="email"
                      label="Email Address"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="location-address"
                      name="locationAddress"
                      label="Office Location Address"
                      autoComplete="location-address"
                    />
                  </Grid>
                </>
              )}
              {userType === "government" && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="health-ministry-name"
                      name="healthMinistryName"
                      required
                      fullWidth
                      id="healthMinistryName"
                      label="Health Ministry Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="country"
                      name="country"
                      required
                      fullWidth
                      id="country"
                      label="Country"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MuiTelInput
                      label="Phone Number"
                      value={phone}
                      onChange={handlePhoneChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      name="email"
                      label="Email Address"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="location-address"
                      name="locationAddress"
                      label="Office Location Address"
                      autoComplete="location-address"
                    />
                  </Grid>
                </>
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Log in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
