import React from "react";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { LocalPharmacy } from "@mui/icons-material";

const Rightbar = ({
  patientFirstNames,
  patientLastNames,
  medicalCompanyNames,
  governmentNames,
}) => {
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
          Governments
        </Typography>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {governmentNames.map((name, i) => (
            <ListItem key={i}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "green" }} alt={name}>
                  {name.charAt(0)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={name} />
            </ListItem>
          ))}
        </List>
        <Typography variant="h6" fontWeight={100} mt={2}>
          Medical Companies
        </Typography>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {medicalCompanyNames.map((name, i) => (
            <ListItem key={i}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "orange" }} alt={name}>
                  {name.charAt(0)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={name} />
            </ListItem>
          ))}
        </List>
        <Typography variant="h6" fontWeight={100} mt={2}>
          Patients
        </Typography>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {patientFirstNames.map((name, i) => (
            <ListItem key={i}>
              <ListItemAvatar>
                <Avatar
                  sx={{ bgcolor: "red" }}
                  alt={name + " " + patientLastNames[i]}
                >
                  {name.charAt(0) + patientLastNames[i].charAt(0)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={name + " " + patientLastNames[i]} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Rightbar;
