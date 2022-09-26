import {
  Article,
  Cancel,
  CheckCircle,
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
} from "@mui/material";
import React from "react";

const Sidebar = ({ mode, setMode }) => {
  return (
    <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box position="fixed">
        <List>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#submitted-reports">
              <ListItemIcon>
                <Article />
              </ListItemIcon>
              <ListItemText primary="Submitted Reports" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#unreviewed-reports">
              <ListItemIcon>
                <Cancel />
              </ListItemIcon>
              <ListItemText primary="Unreviewed Reports" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#reviewed-reports">
              <ListItemIcon>
                <CheckCircle />
              </ListItemIcon>
              <ListItemText primary="Reviewed Reports" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#action-plans">
              <ListItemIcon>
                <Summarize />
              </ListItemIcon>
              <ListItemText primary="Action Plans" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#theme">
              <ListItemIcon>
                <ModeNight />
              </ListItemIcon>
              <ListItemText primary="Theme" />
              <Switch
                onChange={(e) => setMode(mode === "light" ? "dark" : "light")}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
