import Navbar from "../components/Navbar";
import { useWeb3Auth } from "../services/web3auth";
import { useState, useEffect } from "react";
import { Button, Grid, Typography } from "@mui/material";

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
    <div>
      <Grid container sx={{ mt: "200px" }}>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Typography variant="h2">Profile</Typography>

          {userInfo && (
            <div>
              <img
                src={userInfo.profileImage}
                alt="profile"
                style={{ width: "200px", height: "200px", borderRadius: "50%" }}
              />
              <Typography variant="h4">Name: {userInfo.name}</Typography>
              <Typography variant="h4">Email: {userInfo.email}</Typography>
              <Typography variant="h4">Address: {userInfo.address}</Typography>
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
