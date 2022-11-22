import React, { useState, useEffect, createContext, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import ErrorPage from "./pages/ErrorPage";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import UserTypeContext from "./context/UserTypeContext";
import AuthContext from "./context/AuthContext";

import Web3Setup from "./web3";

function App() {
  const [smartContract, setSmartContract] = useState(null);
  const [account, setAccount] = useState("");

  const [userType, setUserType] = useState("");
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    document.title = "AERS";
  });

  useEffect(() => {
    async function setup() {
      const [smartContract, accounts] = await Web3Setup();
      setSmartContract(smartContract);
      setAccount(accounts[0]);
      console.log("Account: " + account);
      let response = await smartContract.methods
        .getUserType(accounts[0])
        .call({ from: accounts[0] });
      console.log("userType: " + response);
      if (response) {
        setUserType(response);
      }
    }
    setup();
  }, []);

  const [mode, setMode] = useState("light");

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <AuthContext.Provider value={[isAuth, setIsAuth]}>
      <UserTypeContext.Provider value={[userType, setUserType]}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <ThemeProvider theme={darkTheme}>
            <Box bgcolor={"background.default"} color={"text.primary"}>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Homepage />} />
                  <Route path="login" element={<Login />} />
                  <Route path="signup" element={<Signup />} />
                  <Route
                    path="main"
                    element={<MainPage mode={mode} setMode={setMode} />}
                  />
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="*" element={<ErrorPage />} />
                </Routes>
              </BrowserRouter>
            </Box>
          </ThemeProvider>
        </LocalizationProvider>
      </UserTypeContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
