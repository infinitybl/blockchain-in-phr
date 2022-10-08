import {
  Article,
  Cancel,
  CheckCircle,
  MedicalServices,
  ModeNight,
  Summarize,
} from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  Typography,
} from "@mui/material";
import React from "react";

const Sidebar = ({ mode, setMode }) => {
  return (
    <Box flex={1} p={2}>
      <Box
        sx={{
          position: {
            sm: "static",
            md: "fixed",
          },
        }}
      >
        <Typography
          variant="h6"
          fontWeight={100}
          mt={2}
          sx={{ textAlign: "center" }}
        >
          Reports Filter
        </Typography>
        <List>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#all">
              <ListItemIcon>
                <Article />
              </ListItemIcon>
              <ListItemText primary="All" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#unreviewed">
              <ListItemIcon>
                <Cancel />
              </ListItemIcon>
              <ListItemText primary="Unreviewed" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#action-plan">
              <ListItemIcon>
                <Summarize />
              </ListItemIcon>
              <ListItemText primary="Action Plan" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#medication-updates">
              <ListItemIcon>
                <MedicalServices />
              </ListItemIcon>
              <ListItemText primary="Medication Updates" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#resolved">
              <ListItemIcon>
                <CheckCircle />
              </ListItemIcon>
              <ListItemText primary="Resolved" />
            </ListItemButton>
          </ListItem>
          {/* <ListItem disablePadding>
            <ListItemButton component="a" href="#theme">
              <ListItemIcon>
                <ModeNight />
              </ListItemIcon>
              <ListItemText primary="Theme" />
              <Switch
                onChange={(e) => setMode(mode === "light" ? "dark" : "light")}
              />
            </ListItemButton>
          </ListItem> */}
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
