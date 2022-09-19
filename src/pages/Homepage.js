import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#fff",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  logInButton: {
    marginRight: "1em",
  },
  signUpButton: {
    marginRight: "1em",
  },
  splash: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format')`,
    height: "100vh",
    overflow: "hidden",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: "4rem",
  },
}));

function Homepage() {
  const classes = useStyles();

  return (
    <div className="App">
      <AppBar className={classes.appBar} position="static">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="primary">
            AERS
          </Typography>
          <Box>
            <Button
              className={classes.logInButton}
              component={Link}
              to="/login"
              variant="contained"
              color="primary"
              sx={{ height: 40 }}
            >
              Log In
            </Button>
            <Button
              className={classes.signUpButton}
              component={Link}
              to="/signup"
              variant="contained"
              color="secondary"
              sx={{ height: 40 }}
            >
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container className={classes.splash}>
        <Box>Adverse Event Reporting System</Box>
      </Container>
    </div>
  );
}

export default Homepage;
