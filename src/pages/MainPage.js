import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Rightbar from "../components/Rightbar";
import { Box, Stack } from "@mui/material";
import NavbarMain from "../components/NavbarMain";
import AddReport from "../components/AddReport";

import React from "react";

function MainPage({ setMode, mode }) {
  return (
    <Box>
      <NavbarMain />
      <Stack
        direction={{ sm: "column", md: "row" }}
        spacing={2}
        justifyContent="space-between"
      >
        <Sidebar setMode={setMode} mode={mode} />
        <Feed />
        <Rightbar />
      </Stack>
      <Box
        sx={{
          marginTop: { xs: "50px", lg: 0 },
        }}
      >
        <AddReport setMode={setMode} mode={mode} />
      </Box>
    </Box>
  );
}

export default MainPage;
