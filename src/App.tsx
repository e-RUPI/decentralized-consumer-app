import React from "react";
import { useState } from "react";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Info from "./pages/Info";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";

import { Web3AuthProvider } from "./services/web3auth";

function App() {
  return (
    <div className="App">
      <Web3AuthProvider
        chain="polygon-mumbai"
        web3AuthNetwork="sapphire_devnet"
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/info" element={<Info />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Web3AuthProvider>
    </div>
  );
}

export default App;
