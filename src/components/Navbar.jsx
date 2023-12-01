import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Button, ButtonGroup, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useWeb3Auth } from "../services/web3auth";
import logo from "../Assets/logo.png";

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
    backgroundColor: "#00a6fb",
    color: "white",
    "&:hover": {
      backgroundColor: "#00a6fb",
      transform: "scale(1.05)",
    },
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
              <ButtonGroup>
                <Button sx={styles.button} onClick={handleLogout}>
                  Logout
                </Button>

                <Link to="/profile" style={{ textDecoration: "none" }}>
                  {userInfo?.name && (
                    <img
                      src={userInfo.profileImage}
                      alt="profile"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        marginLeft: "10px",
                      }}
                    />
                  )}
                </Link>
              </ButtonGroup>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </Grid>
  );
};

export default Appbar;
