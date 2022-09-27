import React from "react";
import { Box, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";

const primary = blue[500]; // #f44336

export default function ErrorPage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: primary,
      }}
    >
      <Typography variant="h1" style={{ color: "white" }}>
        404
      </Typography>
    </Box>
  );
}
