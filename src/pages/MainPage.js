import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Rightbar from "../components/Rightbar";
import { Box, Stack } from "@mui/material";
import NavbarMain from "../components/NavbarMain";
import AddReport from "../components/AddReport";
import AddActionPlan from "../components/AddActionPlan";

function MainPage({ setMode, mode }) {
  const [actionPlanModalOpen, setActionPlanModalOpen] = useState(false);

  return (
    <Box>
      <NavbarMain />
      <Stack
        direction={{ sm: "column", md: "row" }}
        spacing={2}
        justifyContent="space-between"
      >
        <Sidebar setMode={setMode} mode={mode} />
        <Feed
          actionPlanModalOpen={actionPlanModalOpen}
          setActionPlanModalOpen={setActionPlanModalOpen}
        />
        <Rightbar />
      </Stack>
      <Box
        sx={{
          marginTop: { xs: "50px", lg: 0 },
        }}
      >
        <AddReport />
        <AddActionPlan
          open={actionPlanModalOpen}
          setOpen={setActionPlanModalOpen}
        />
      </Box>
    </Box>
  );
}

export default MainPage;
