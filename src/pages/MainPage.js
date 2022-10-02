import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Rightbar from "../components/Rightbar";
import { Box, Stack } from "@mui/material";
import Navbar from "../components/Navbar";
import AddReport from "../components/AddReport";
import ChangeTheme from "../components/ChangeTheme";
import React from "react";

function MainPage({ setMode, mode }) {
  return (
    <Box>
      <Navbar />
      <Stack
        direction={{ sm: "column", md: "row" }}
        spacing={2}
        justifyContent="space-between"
        sx={{
          marginBotton: "50px",
        }}
      >
        <Sidebar setMode={setMode} mode={mode} />
        <Feed />
        <Rightbar />
      </Stack>
      <AddReport />
      <ChangeTheme setMode={setMode} mode={mode} />
    </Box>
  );
}

export default MainPage;
