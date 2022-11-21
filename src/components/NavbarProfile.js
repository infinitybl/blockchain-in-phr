import React from "react";
import { AppBar, Box, Button, Toolbar, IconButton } from "@mui/material";
import { LocalHospital } from "@mui/icons-material";

import { Link as LinkReactRouterDom } from "react-router-dom";

const NavbarProfile = () => {
  return (
    <AppBar position="sticky">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* <Typography variant="h6" color="primary">
        AERS
      </Typography> */}
        <IconButton
          component={LinkReactRouterDom}
          to="/main"
          sx={{ color: "white" }}
        >
          <LocalHospital sx={{ display: { xs: "block" } }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarProfile;
