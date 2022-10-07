import React from "react";
import { AppBar, Box, Button, Toolbar, IconButton } from "@mui/material";
import { LocalHospital } from "@mui/icons-material";

import { Link as LinkReactRouterDom } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* <Typography variant="h6" color="primary">
        AERS
      </Typography> */}
        <IconButton
          component={LinkReactRouterDom}
          to="/"
          sx={{ color: "white" }}
        >
          <LocalHospital sx={{ display: { xs: "block" } }} />
        </IconButton>
        <Box>
          <Button
            component={LinkReactRouterDom}
            to="/login"
            variant="contained"
            color="success"
            sx={{ height: 40, marginRight: "1em" }}
          >
            Log In
          </Button>
          <Button
            component={LinkReactRouterDom}
            to="/signup"
            variant="contained"
            color="secondary"
            sx={{ height: 40, marginRight: "1em" }}
          >
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
