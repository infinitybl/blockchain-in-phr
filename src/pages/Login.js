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

import { LockOutlined } from "@mui/icons-material";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import Navbar from "../components/Navbar";

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

export default function Login() {
  const navigate = useNavigate();
  const [smartContract, setSmartContract] = useState(null);
  const [account, setAccount] = useState("");

  const [userType, setUserType] = useContext(UserTypeContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  useEffect(() => {
    async function setup() {
      const [smartContract, accounts] = await Web3Setup();
      setSmartContract(smartContract);
      setAccount(accounts[0]);
      console.log("Account: " + accounts[0]);
      let userTypeResponse = await smartContract.methods
        .getUserType(accounts[0])
        .call({ from: accounts[0] });
      console.log("userType: " + userTypeResponse);
      if (userTypeResponse) {
        setUserType(userTypeResponse);
        navigate("/main");
      } else {
        navigate("/signup");
      }
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
            Log In
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="metamask-wallet-address"
              name="metaMaskWalletAddress"
              label="MetaMask Wallet Address"
              autoComplete="metamask-wallet-address"
              autoFocus
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            {/* <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
