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
import React, { useState, useEffect, useContext } from "react";

import UserTypeContext from "../context/UserTypeContext";

import { Link as LinkReactRouterDom } from "react-router-dom";

import Web3Setup from "../web3";
import { encrypt, decrypt } from "../crypto";

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

const NavbarMain = ({ setSearchText }) => {
  const [smartContract, setSmartContract] = useState(null);
  const [account, setAccount] = useState("");

  const [open, setOpen] = useState(false);

  const [userType, setUserType] = useContext(UserTypeContext);

  const [avatarText, setAvatarText] = useState("");

  const [avatarColour, setAvatarColour] = useState("red");

  useEffect(() => {
    async function setup() {
      const [smartContract, accounts] = await Web3Setup();
      setSmartContract(smartContract);
      setAccount(accounts[0]);
      console.log("Account: " + account);
      let userTypeResponse = await smartContract.methods
        .getUserType(accounts[0])
        .call({ from: accounts[0] });
      console.log("userType: " + userTypeResponse);
      if (userTypeResponse) {
        setUserType(userTypeResponse);
      }
      if (userType === "patient") {
        setAvatarColour("red");
        let response = await smartContract.methods
          .getPatientProfile(accounts[0])
          .call({ from: accounts[0] });
        const firstName = response["_firstName"]
          ? decrypt(response["_firstName"])
          : "";
        const lastName = response["_lastName"]
          ? decrypt(response["_lastName"])
          : "";
        setAvatarText(firstName.charAt(0) + lastName.charAt(0));
      } else if (userType === "medicalCompany") {
        setAvatarColour("orange");
        let response = await smartContract.methods
          .getMedicalCompanyProfile(accounts[0])
          .call({ from: accounts[0] });
        const companyName = response["companyName"]
          ? decrypt(response["companyName"])
          : "";
        setAvatarText(companyName.charAt(0));
      } else if (userType === "government") {
        setAvatarColour("green");
        let response = await smartContract.methods
          .getGovernmentProfile(accounts[0])
          .call({ from: accounts[0] });
        const name = response["name"] ? decrypt(response["name"]) : "";
        setAvatarText(name.charAt(0));
      }
    }
    setup();
  }, []);

  useEffect(() => {
    async function setup() {
      if (smartContract) {
        let userTypeResponse = await smartContract.methods
          .getUserType(account)
          .call({ from: account });
        console.log("userType: " + userTypeResponse);
        if (userTypeResponse) {
          setUserType(userTypeResponse);
        }
        if (userType === "patient") {
          setAvatarColour("red");
          let response = await smartContract.methods
            .getPatientProfile(account)
            .call({ from: account });
          const firstName = response["_firstName"]
            ? decrypt(response["_firstName"])
            : "";
          const lastName = response["_lastName"]
            ? decrypt(response["_lastName"])
            : "";
          setAvatarText(firstName.charAt(0) + lastName.charAt(0));
        } else if (userType === "medicalCompany") {
          setAvatarColour("orange");
          let response = await smartContract.methods
            .getMedicalCompanyProfile(account)
            .call({ from: account });
          const companyName = response["companyName"]
            ? decrypt(response["companyName"])
            : "";
          setAvatarText(companyName.charAt(0));
        } else if (userType === "government") {
          setAvatarColour("green");
          let response = await smartContract.methods
            .getGovernmentProfile(account)
            .call({ from: account });
          const name = response["name"] ? decrypt(response["name"]) : "";
          setAvatarText(name.charAt(0));
        }
      }
    }
    setup();
  }, [userType]);

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
          <InputBase
            sx={{ color: "black" }}
            placeholder="Search By Description"
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
          />
        </Search>
        <Icons>
          {/* <Badge badgeContent={4} color="error">
            <Mail />
          </Badge>
          <Badge badgeContent={2} color="error">
            <Notifications />
          </Badge> */}
          {userType === "patient" && (
            <Avatar
              sx={{ width: 30, height: 30, bgcolor: avatarColour }}
              onClick={(e) => setOpen(true)}
            >
              {avatarText}
            </Avatar>
          )}
          {userType === "medicalCompany" && (
            <Avatar
              sx={{ width: 30, height: 30, bgcolor: avatarColour }}
              onClick={(e) => setOpen(true)}
            >
              {avatarText}
            </Avatar>
          )}
          {userType === "government" && (
            <Avatar
              sx={{ width: 30, height: 30, bgcolor: avatarColour }}
              onClick={(e) => setOpen(true)}
            >
              {avatarText}
            </Avatar>
          )}
        </Icons>
        <UserBox onClick={(e) => setOpen(true)}>
          {userType === "patient" && (
            <Avatar sx={{ width: 30, height: 30, bgcolor: avatarColour }}>
              {avatarText}
            </Avatar>
          )}
          {userType === "medicalCompany" && (
            <Avatar sx={{ width: 30, height: 30, bgcolor: avatarColour }}>
              {avatarText}
            </Avatar>
          )}
          {userType === "government" && (
            <Avatar sx={{ width: 30, height: 30, bgcolor: avatarColour }}>
              {avatarText}
            </Avatar>
          )}
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
        <MenuItem component={LinkReactRouterDom} to="/profile">
          Profile
        </MenuItem>
        <MenuItem component={LinkReactRouterDom} to="/">
          Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default NavbarMain;
