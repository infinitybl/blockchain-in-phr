import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";

const Rightbar = () => {
  return (
    <Box flex={2} p={2} sx={{ display: "block" }}>
      <Box
        sx={{
          position: {
            sm: "static",
            md: "fixed",
          },
        }}
      >
        <Typography variant="h6" fontWeight={100} mt={2}>
          Associated Health Ministries
        </Typography>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Health Canada" />
            </ListItemAvatar>
            <ListItemText
              primary="Health Canada"
              secondary={
                <React.Fragment>
                  {
                    "Health Canada is the department of the Government of Canada responsible for national health policy."
                  }
                </React.Fragment>
              }
            />
          </ListItem>
        </List>
        <Typography variant="h6" fontWeight={100} mt={2}>
          Associated Pharmacies
        </Typography>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Rexall Pharmacy" />
            </ListItemAvatar>
            <ListItemText
              primary="Rexall Pharmacy"
              secondary={
                <React.Fragment>
                  {
                    "Rexall Pharmacy Group ULC is a chain of retail pharmacies in Canada."
                  }
                </React.Fragment>
              }
            />
          </ListItem>
        </List>
        <Typography variant="h6" fontWeight={100} mt={2}>
          Associated Patients
        </Typography>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="John Doe" />
            </ListItemAvatar>
            <ListItemText primary="John Doe" />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Rightbar;
