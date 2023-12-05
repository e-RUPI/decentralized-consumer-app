import { Route, Routes } from "react-router";
import Home from "./pages/Home";
// import Info from "./pages/Info";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import { Grid } from "@mui/material";
import Footer from "./components/footer";
import Vouchers from "./pages/Vouchers";
import Schemes from "./pages/Schemes";
import { Web3AuthProvider } from "./services/web3auth";

function App() {
  return (
    <Grid container className="App">
      <Web3AuthProvider
        chain="polygon-mumbai"
        web3AuthNetwork="sapphire_devnet"
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/info" element={<Info />} /> */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/vouchers" element={<Vouchers />} />
          <Route path="/schemes" element={<Schemes />} />
        </Routes>
        <Footer />
      </Web3AuthProvider>
    </Grid>
  );
}

export default App;
