import { useWeb3Auth } from "../services/web3auth";
import { useState, useEffect } from "react";
import { Divider, Grid, Typography } from "@mui/material";

const Profile = () => {
  const { provider, getUserInfo } = useWeb3Auth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (provider) {
      getUserInfo().then((res) => {
        setUserInfo(res);
        console.log(res);
      });
    }
  }, [provider, getUserInfo]);

  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Grid item xs={10}>
        <Typography variant="h4">Profile</Typography>
        <Divider sx={{ mt: "20px", mb: "20px" }} />
        {/* // display all fields from userInfo by mapping key value*/}
        {userInfo &&
          Object.keys(userInfo).map((key) => (
            <Typography key={key} >
              {key}: {userInfo[key]}
            </Typography>
          ))}
      </Grid>
    </Grid>
  );
};

export default Profile;
