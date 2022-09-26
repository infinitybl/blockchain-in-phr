import { Box, Stack, Skeleton } from "@mui/material";
import React, { useState } from "react";
import ReportCard from "./ReportCard";

import { styled, InputBase } from "@mui/material";

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "grey",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));

const Feed = () => {
  const [loading, setLoading] = useState(false);

  //   setTimeout(() => {
  //     setLoading(false);
  //   }, [3000]);

  return (
    <Box flex={4} p={{ xs: 0, md: 2 }}>
      {loading ? (
        <Stack spacing={1}>
          <Skeleton variant="text" height={100} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="rectangular" height={300} />
        </Stack>
      ) : (
        <Box>
          {/* <Search>
            <InputBase placeholder="Search Reports" />
          </Search> */}
          <ReportCard />
        </Box>
      )}
    </Box>
  );
};

export default Feed;
