import {
  Box,
  Stack,
  Skeleton,
  Typography,
  styled,
  InputBase,
} from "@mui/material";
import React, { useState } from "react";
import ReportCard from "./ReportCard";

import { useLocation } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "grey",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));

const Feed = () => {
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
          <ReportCard
            reporterName="John Doe"
            incidentDescription="Incident Description 1"
            incidentDate="August 28, 2022"
            incidentCategory="Prescribed Medication"
            careSetting="Home"
            medicationTaken="Atorvastatin"
            medicalCompanyInvolved="Rexall Pharmacy"
            files=""
          />
          <ReportCard
            reporterName="John Doe"
            incidentDescription="Incident Description 2"
            incidentDate="January 14, 2022"
            incidentCategory="Clinical Trial"
            careSetting="Home"
            medicationTaken="Lisinopril"
            medicalCompanyInvolved="Rexall Pharmacy"
            files=""
          />
        </Box>
      )}
    </Box>
  );
};

export default Feed;
