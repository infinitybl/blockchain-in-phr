import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Rightbar from "../components/Rightbar";
import { Box, Stack } from "@mui/material";
import NavbarMain from "../components/NavbarMain";
import AddReport from "../components/AddReport";
import AddActionPlan from "../components/AddActionPlan";
import EditReport from "../components/EditReport";

function MainPage({ setMode, mode }) {
  const [addActionPlanModalOpen, setAddActionPlanModalOpen] = useState(false);
  const [editReportModalOpen, setEditReportModalOpen] = useState(false);

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
          addActionPlanModalOpen={addActionPlanModalOpen}
          setAddActionPlanModalOpen={setAddActionPlanModalOpen}
          editReportModalOpen={editReportModalOpen}
          setEditReportModalOpen={setEditReportModalOpen}
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
          open={addActionPlanModalOpen}
          setOpen={setAddActionPlanModalOpen}
        />
        <EditReport
          open={editReportModalOpen}
          setOpen={setEditReportModalOpen}
        />
      </Box>
    </Box>
  );
}

export default MainPage;
