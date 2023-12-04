import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Button, ButtonGroup, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useWeb3Auth } from "../services/web3auth";
import logo from "../Assets/logo.png";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import Avatar from "@mui/material/Avatar";

const styles = {
  appBar: {
    backgroundColor: "transparent",
    height: "180px",
    boxShadow: "none",
  },
  toolbar: {
    margin: 2,
    backgroundColor: "#FAFAFF",
    borderRadius: "10px",
    py: 1,
    boxShadow: "1px 1px 1px 1px #DADDD8",
  },
  button: {
    color: "#00a6fb",
    margin: "10px",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  logout_buttons: {
    height: 40,
    width: 110,
    margin: "5px",
    fontSize: 12,
  },
};

const Appbar = () => {
  const { provider, login, logout, getUserInfo } = useWeb3Auth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (provider) {
        const res = await getUserInfo();
        setUserInfo(res);
        console.log(res);
      }
    };

    fetchData();
  }, [provider, getUserInfo]);

  const handleLogin = async () => {
    login();
  };

  const handleLogout = async () => {
    logout();
    setUserInfo(null);
    window.location.reload();
  };

  return (
    <Grid container sx={{ display: "flex" }}>
      <AppBar component="nav" position="fixed" sx={styles.appBar}>
        <Toolbar sx={styles.toolbar}>
          <Grid
            container
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              display: { xs: "none", sm: "none", md: "flex" },
            }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              <img src={logo} alt="logo" width="100px" />
            </Link>

            {!provider ? (
              <ButtonGroup variant="text">
                <Button sx={styles.button} onClick={handleLogin}>
                  Login
                </Button>
              </ButtonGroup>
            ) : (
              <ButtonGroup variant="contained" sx={{ mt: 1 }}>
                <Button sx={styles.logout_buttons} onClick={handleLogout}>
                  Logout
                </Button>

                <Button
                  href="/profile"
                  sx={{
                    fontFamily: "Josefin Sans, sans-serif",
                    backgroundColor: "transparent",
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src={userInfo?.profilePic}
                    sx={{
                      width: 40,
                      height: 40,
                    }}
                  />
                </Button>
              </ButtonGroup>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </Grid>
  );
};

export default Appbar;
