import {
  Box,
  Stack,
  Skeleton,
  Typography,
  styled,
  InputBase,
} from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import UserTypeContext from "../context/UserTypeContext";
import ReportCard from "./ReportCard";

import { useLocation } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "grey",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));

const Feed = ({
  reports,
  addActionPlanModalOpen,
  setAddActionPlanModalOpen,
  editReportModalOpen,
  setEditReportModalOpen,
}) => {
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  //   setTimeout(() => {
  //     setLoading(false);
  //   }, [3000]);

  return (
    <Box flex={4} p={{ xs: 0, md: 2 }} sx={{ height: "100vh" }}>
      {loading ? (
        <Stack spacing={1}>
          <Skeleton variant="text" height={100} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="rectangular" height={300} />
        </Stack>
      ) : (
        <Box>
          <Typography
            variant="h6"
            fontWeight={100}
            mt={2}
            sx={{ textAlign: "center" }}
          >
            Reports
          </Typography>
          {/* <Search>
            <InputBase placeholder="Search Reports" />
          </Search> */}
          {reports.map((report, i) => (
            <ReportCard
              key={i}
              reporterFirstName={report.reporterFirstName}
              reporterLastName={report.reporterLastName}
              incidentDescription={report.incidentDescription}
              incidentDate={report.incidentDate}
              incidentCategory={report.incidentCategory}
              careSetting={report.careSetting}
              medicationTaken={report.medicationTaken}
              medicalCompanyInvolved={report.medicalCompanyInvolved}
              file={report.ipfsHash}
              actionPlan={report.actionPlan}
              isResolved={report.isResolved}
              addActionPlanModalOpen={addActionPlanModalOpen}
              setAddActionPlanModalOpen={setAddActionPlanModalOpen}
              editReportModalOpen={editReportModalOpen}
              setEditReportModalOpen={setEditReportModalOpen}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Feed;
