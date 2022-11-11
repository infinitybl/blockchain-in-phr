import React, { useState, useEffect, useContext } from "react";

import UserTypeContext from "../context/UserTypeContext";

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

import { LocalPharmacy, LockOutlinedIcon } from "@mui/icons-material";

import Navbar from "../components/Navbar";

import moment from "moment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { MuiTelInput } from "mui-tel-input";

import Web3Setup from "../web3";

const theme = createTheme();

export default function ProfilePage() {
  const [contracts, setContracts] = useState(null);
  const [account, setAccount] = useState("");

  const [userType, setUserType] = useContext(UserTypeContext);
  const [phone, setPhone] = useState("");

  const [selectedDate, setSelectedDate] = useState(moment());

  useEffect(async () => {
    const [contracts, accounts] = await Web3Setup();
    setContracts(contracts);
    setAccount(accounts[0]);
    console.log("Account: " + account);
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
            <LocalPharmacy />
          </Avatar>
          <Typography component="h1" variant="h5">
            Profile
          </Typography>
          <Box sx={{ marginTop: 2 }}>
            <InputLabel variant="standard">User Type</InputLabel>
            <ButtonGroup disableElevation variant="contained" color="primary">
              <Button color={userType === "patient" ? "secondary" : "primary"}>
                Patient
              </Button>
              <Button
                color={userType === "medicalCompany" ? "secondary" : "primary"}
              >
                Medical Company
              </Button>
              <Button
                color={userType === "government" ? "secondary" : "primary"}
              >
                Health Ministry
              </Button>
            </ButtonGroup>
          </Box>
          <Box component="form" noValidate sx={{ mt: 3, mb: 8 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="metamask-wallet-address"
                  name="metaMaskWalletAddress"
                  label="MetaMask Wallet Address"
                  autoComplete="metamask-wallet-address"
                  inputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
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
                      inputProps={{
                        readOnly: true,
                      }}
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
                      inputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <DatePicker
                      label="Date of Birth"
                      value={selectedDate}
                      renderInput={(params) => <TextField {...params} />}
                      inputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MuiTelInput
                      label="Phone Number"
                      value={phone}
                      inputProps={{
                        readOnly: true,
                      }}
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
                      inputProps={{
                        readOnly: true,
                      }}
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
                      inputProps={{
                        readOnly: true,
                      }}
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
                      inputProps={{
                        readOnly: true,
                      }}
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
                        defaultValue={"O-"}
                        inputProps={{
                          name: "blood-type",
                          id: "uncontrolled-native",
                        }}
                        disabled
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
                      inputProps={{
                        readOnly: true,
                      }}
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
                      inputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MuiTelInput
                      label="Phone Number"
                      value={phone}
                      inputProps={{
                        readOnly: true,
                      }}
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
                      inputProps={{
                        readOnly: true,
                      }}
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
                      inputProps={{
                        readOnly: true,
                      }}
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
                      inputProps={{
                        readOnly: true,
                      }}
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
                      inputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MuiTelInput
                      label="Phone Number"
                      value={phone}
                      inputProps={{
                        readOnly: true,
                      }}
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
                      inputProps={{
                        readOnly: true,
                      }}
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
                      inputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
