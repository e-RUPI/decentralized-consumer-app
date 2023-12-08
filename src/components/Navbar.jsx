import { AppBar, Toolbar, Button, ButtonGroup, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useWeb3Auth } from "../services/web3auth";
import logo from "../Assets/logo.png";

const styles = {
  appBar: {
    backgroundColor: "transparent",
  },
  toolbar: {
    backgroundColor: "#FAFAFF",
    borderRadius: "10px",
    py: 1,
    boxShadow: "1px 1px 1px 1px #DADDD8",
  },

  buttons: {
    backgroundColor: "#FAFAFF",
    color: "#00a6fb",
    borderRadius: "5px",
    height: 40,
    width: 110,
    margin: "5px",
    fontSize: 12,
  },
};

const Appbar = () => {
  const { provider, login, logout } = useWeb3Auth();

  const handleLogin = async () => {
    login();
  };

  const handleLogout = async () => {
    logout();
    
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
            }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              <img src={logo} alt="logo" width="100px" />
            </Link>

            {!provider ? (
              <ButtonGroup variant="text">
                <Button sx={styles.buttons} onClick={handleLogin}>
                  Login
                </Button>
              </ButtonGroup>
            ) : (
              <ButtonGroup variant="text">
                <Button sx={styles.buttons} onClick={handleLogout}>
                  Logout
                </Button>
                <Button sx={styles.buttons} href="/vouchers">
                  Vouchers
                </Button>
                <Button sx={styles.buttons} href="/schemes">
                  Schemes
                </Button>
                <Button sx={styles.buttons} href="/profile">
                  Profile
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
