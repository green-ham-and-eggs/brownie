import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import green from "@material-ui/core/colors/green";

const useStyles = makeStyles((theme) => ({
    root: {
        boxShadow: "none",
        backgroundColor: "#DDDBD7",
        margin: theme.spacing(1)
    },
    navbutton: {
    border: 0,
    borderRadius: 10,
    color: 'black',
    height: 35,
    padding: '0 20px',
    fontSize:15
    
    },
    title: {
        color: 'black',

    padding: '0 20px',
    fontSize:20
    }

  }));

const Navbar = () => {
    const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar
        className={classes.root}>
        <Toolbar>
        <IconButton className={classes.title}>
            Brownie
          </IconButton>
          <IconButton className={classes.navbutton}>
            Users
          </IconButton>
          <IconButton className={classes.navbutton}>
            ScoreBoard
          </IconButton>
          <IconButton className={classes.navbutton}>
            History
          </IconButton>

        </Toolbar>
      </AppBar>

      <Toolbar />
    </React.Fragment>
  );
};
export default Navbar;
