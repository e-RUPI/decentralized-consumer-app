import React from "react";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
// import Info from "./pages/Info";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import { Grid } from "@mui/material";

import { Web3AuthProvider } from "./services/web3auth";

function App() {
  return (
    <Grid container className="App">
      <Web3AuthProvider
        chain="polygon-mumbai"
        web3AuthNetwork="sapphire_devnet"
      >
        <Grid item xs={12}>
          <Navbar />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            mt: "150px",
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/info" element={<Info />} /> */}
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Grid>
      </Web3AuthProvider>
    </Grid>
  );
}

export default App;
