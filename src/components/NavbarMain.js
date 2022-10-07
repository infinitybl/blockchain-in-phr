import { LocalHospital } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import { Link as LinkReactRouterDom } from "react-router-dom";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

const NavbarMain = () => {
  const [open, setOpen] = useState(false);

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        {/* <Typography variant="h6" sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
          AERS
        </Typography> */}
        <IconButton
          component={LinkReactRouterDom}
          to="/"
          sx={{ color: "white" }}
        >
          <LocalHospital
            sx={{ display: { xs: "block", sm: "none", md: "block" } }}
          />
        </IconButton>
        <Search>
          <InputBase placeholder="Search Reports" />
        </Search>
        <Icons>
          {/* <Badge badgeContent={4} color="error">
            <Mail />
          </Badge>
          <Badge badgeContent={2} color="error">
            <Notifications />
          </Badge> */}
          <Avatar
            sx={{ width: 30, height: 30 }}
            onClick={(e) => setOpen(true)}
          />
        </Icons>
        <UserBox onClick={(e) => setOpen(true)}>
          <Avatar sx={{ width: 30, height: 30 }} />
          <Typography variant="span">John</Typography>
        </UserBox>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default NavbarMain;
