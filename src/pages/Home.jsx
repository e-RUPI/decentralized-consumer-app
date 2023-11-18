import Navbar from "../components/Navbar";
import { useWeb3Auth } from "../services/web3auth";
import { useState, useEffect } from "react";
import { Button, Grid, Typography } from "@mui/material";

const Home = () => {
  const { provider, getUserInfo } = useWeb3Auth();
  const [userInfo, setUserInfo] = useState(null);

  const fetchData = async () => {
    const info = await getUserInfo();
    setUserInfo(info);
  };

  return (
    <div>
      <Grid container sx={{ mt: "200px" }}>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Typography variant="h2">Welcome to Erupi</Typography>
          <button onClick={fetchData}>Get User Info</button>
          {userInfo && userInfo.name && (
            <Typography variant="h3">Hello, {userInfo.name}</Typography>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
