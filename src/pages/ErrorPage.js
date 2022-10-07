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
          textAlign: "center",
        }}
      >
        <Box>
          <Typography variant="h1" style={{ color: "white" }} p={2}>
            404 Page Not Found
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "18px",
            }}
          >
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
      </Box>
    </>
  );
}
