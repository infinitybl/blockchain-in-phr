import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { FormControl, InputLabel, NativeSelect } from "@mui/material";

import Navbar from "../components/Navbar";

import moment from "moment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { MuiTelInput } from "mui-tel-input";

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
  const [phone, setPhone] = useState("");

  const handlePhoneChange = (newPhone) => {
    setPhone(newPhone);
  };

  const [selectedDate, setSelectedDate] = useState(moment());

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="metamask-wallet-address"
                  name="metaMaskWalletAddress"
                  label="MetaMask Wallet Address"
                  autoComplete="metamask-wallet-address"
                />
              </Grid>
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
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Blood Type
                  </InputLabel>
                  <NativeSelect
                    defaultValue={"O-"}
                    inputProps={{
                      name: "blood-type",
                      id: "uncontrolled-native",
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
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
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
