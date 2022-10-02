import React, { useState } from "react";

import { ModeNight } from "@mui/icons-material";

import { Fab, Switch } from "@mui/material";

const ChangeTheme = ({ mode, setMode, open }) => {
  return (
    !open && (
      <Fab
        color="primary"
        aria-label="change-theme"
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
        }}
        variant="extended"
      >
        <ModeNight />
        <Switch
          onChange={(e) => setMode(mode === "light" ? "dark" : "light")}
        />
      </Fab>
    )
  );
};

export default ChangeTheme;
