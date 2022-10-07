import React from "react";
import { Typography, Box, Button, Container } from "@mui/material";

import backgroundImg from "../pictures/background.jpg";

import Navbar from "../components/Navbar";

function Homepage() {
  return (
    <div className="App">
      <Navbar />
      <Container
        maxWidth={false}
        sx={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImg})`,
          height: "100vh",
          spacing: 0,
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
