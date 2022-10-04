import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Container,
} from "@mui/material";

import { LocalHospital } from "@mui/icons-material";

import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* <Typography variant="h6" color="primary">
            AERS
          </Typography> */}
          <LocalHospital
            sx={{ display: { xs: "block", sm: "none", md: "block" } }}
          />
          <Box>
            <Button
              component={Link}
              to="/login"
              variant="contained"
              color="success"
              sx={{ height: 40, marginRight: "1em" }}
            >
              Log In
            </Button>
            <Button
              component={Link}
              to="/signup"
              variant="contained"
              color="secondary"
              sx={{ height: 40, marginRight: "1em" }}
            >
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container
        sx={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format')`,
          height: "100vh",
          overflow: "hidden",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          fontSize: "4rem",
        }}
      >
        <Box>Adverse Event Reporting System</Box>
      </Container>
    </div>
  );
}

export default Homepage;
