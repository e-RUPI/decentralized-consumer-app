"use client";
import { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

import { agricultureContract, NFTAbi } from "../constants/data";
import { ethers } from "ethers";

const contractAddress = agricultureContract;
const contractAbi = NFTAbi;

const containerStyles = {
  height: "90vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const formContainerStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: 5,
};

const textFieldStyles = {
  margin: 1,
};

const buttonStyles = {
  height: 50,
  backgroundColor: "#212529",
  margin: "8px",
};

const RedeemCouponPage = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const tokenId = urlParams.get("tokenId");

  // const [tokenId, setTokenId] = useState("");
  const [merchantAddress, setMerchantAddress] = useState("");
  const [redeemAmount, setRedeemAmount] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleRedeemCoupon = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const Pkey =
        "9b2d1f23d1831949ccf603490528ec2ea407d87dbb3f49baa8a851133761ba41"; // Replace with the private key

      // Make sure to replace the contract address and ABI with the actual values
      const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        new ethers.Wallet(Pkey, provider)
      );

      // Call the redeemCoupon function
      await contract.redeemCoupon(tokenId, merchantAddress, redeemAmount);

      setSnackbarSeverity("success");
      setSnackbarMessage("Coupon redeemed successfully!");
      setOpenSnackbar(true);

      setMerchantAddress("");
      setRedeemAmount("");
    } catch (error) {
      console.error("Error redeeming coupon:", error);
      setSnackbarSeverity("error");
      setSnackbarMessage("Failed to redeem coupon. Please try again.");
      setOpenSnackbar(true);
    }
  };

  // extract tokein in from the url

  return (
    <Grid container sx={containerStyles}>
      <Grid item xs={6} sx={formContainerStyles}>
        <Typography
          variant="h4"
          sx={{ color: "#000", fontWeight: "bold", textAlign: "center", m: 2 }}
        >
          Redeem Coupon
        </Typography>
        {/* <TextField
          name="tokenId"
          value={tokenId}
          fullWidth
          label="Coupon Token ID"
          placeholder="Enter Token ID"
          onChange={(e) => setTokenId(e.target.value)}
          required
          sx={textFieldStyles}
        /> */}
        <TextField
          name="merchantAddress"
          value={merchantAddress}
          fullWidth
          label="Merchant Address"
          placeholder="Enter Merchant Address"
          onChange={(e) => setMerchantAddress(e.target.value)}
          required
          sx={textFieldStyles}
        />
        <TextField
          name="redeemAmount"
          value={redeemAmount}
          fullWidth
          label="Redeem Amount"
          placeholder="Enter Redemption Amount"
          onChange={(e) => setRedeemAmount(e.target.value)}
          required
          sx={textFieldStyles}
        />
        <Button
          style={buttonStyles}
          onClick={handleRedeemCoupon}
          variant="contained"
          color="primary"
        >
          Redeem Coupon
        </Button>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default RedeemCouponPage;
