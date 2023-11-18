import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { ButtonGroup, Grid, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useWeb3Auth } from "../services/web3auth";

const btn = {
  marginRight: "20px",
  color: "black",
  backgroundColor: "transparent",
  height: "40px",
  width: "auto",
  "&:hover": {
    backgroundColor: "#F9A826",
    color: "black",
  },
};

export default function Appbar() {
  const { provider, login, logout, getUserInfo } = useWeb3Auth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (provider) {
      getUserInfo().then((res) => {
        setUserInfo(res);
        console.log(res);
      });
    }
  }, [provider, getUserInfo]);

  const handleLogin = async () => {
    login();
  };
  const handleLogout = async () => {
    logout();
    setUserInfo(null);
  };

  return (
    <Grid sx={{ display: "flex" }}>
      <AppBar
        component="nav"
        position="fixed"
        sx={{
          backgroundColor: "transparent",
          height: "180px",
          boxShadow: "none",
        }}
      >
        <Toolbar
          sx={{
            m: 2,
            backgroundColor: "#FAFAFF",
            borderRadius: "10px",
            py: 1,
            boxShadow: "1px 1px 1px 1px #DADDD8",
          }}
        >
          {/* ------------ Desktop -------------- */}
          <Grid
            container
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              display: { xs: "none", sm: "none", md: "flex" },
            }}
          >
            <>
              <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                Erupi
              </Link>
            </>

            {!provider ? (
              <ButtonGroup variant="text">
                <Button sx={btn} onClick={handleLogin}>
                  Login
                </Button>
              </ButtonGroup>
            ) : (
              <ButtonGroup variant="text">
                <Button sx={btn} onClick={handleLogout}>
                  Logout
                </Button>

                <Link to="/profile" style={{ textDecoration: "none" }}>
                  {userInfo && userInfo.name && (
                    <img
                      src={userInfo.profileImage}
                      alt="profile"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
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
}
