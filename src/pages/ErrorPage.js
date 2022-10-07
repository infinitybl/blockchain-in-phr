import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";

import { Link as LinkReactRouterDom } from "react-router-dom";

import Navbar from "../components/Navbar";

const primary = blue[500]; // #f44336

export default function ErrorPage() {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: primary,
        }}
      >
        <Box>
          <Typography variant="h1" style={{ color: "white" }}>
            404 Page Not Found
          </Typography>
          <Button
            component={LinkReactRouterDom}
            to="/"
            variant="contained"
            color="success"
            sx={{ height: 40, textAlign: "center", margin: "auto" }}
          >
            Return to Homepage
          </Button>
        </Box>
      </Box>
    </>
  );
}
