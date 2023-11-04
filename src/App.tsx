import React from "react";
// import "./App.css";
import { useState } from "react";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Info from "./pages/Info";

// WEB3 AUTH IMPORTS

// import { WEB3AUTH_NETWORK_TYPE } from "./config/web3AuthNetwork";
// import { CHAIN_CONFIG_TYPE } from "./config/chainConfig";
import { Web3AuthProvider } from "./services/web3auth";

function App() {
  const [web3AuthNetwork, setWeb3AuthNetwork] = useState("sapphire_devnet");
  const [chain, setChain] = useState("polygon-mumbai");
  return (
    <div className="App">
      {/* <Web3AuthProvider chain={chain} web3AuthNetwork={web3AuthNetwork}> */}
      <Web3AuthProvider
        chain="polygon-mumbai"
        web3AuthNetwork="sapphire_devnet"
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/info" element={<Info />} />
        </Routes>
      </Web3AuthProvider>
    </div>
  );
}

export default App;
