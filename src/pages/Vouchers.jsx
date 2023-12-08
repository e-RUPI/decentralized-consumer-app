import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Divider,
  CardActions,
  CardHeader,
  Button,
} from "@mui/material";
import Web3 from "web3";
import { agricultureContract, NFTAbi } from "../constants/data";

const contractAddress = agricultureContract;
const contractAbi = NFTAbi;

function convertIpfsUrl(ipfsUrl) {
  const hash = ipfsUrl.match(/ipfs:\/\/([a-zA-Z0-9]+)/)[1];
  return `https://${hash}.ipfs.nftstorage.link/metadata.json`;
}

function convertIpfsUrlIntoImage(ipfsUrl) {
  const hash = ipfsUrl.match(/ipfs:\/\/([a-zA-Z0-9]+)/)[1];
  return `https://${hash}.ipfs.nftstorage.link/image.jpg`;
}

const Vouchers = () => {
  const [couponData, setCouponData] = useState([]);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        if (typeof window.ethereum === "undefined") {
          alert("Please install MetaMask first.");
          return;
        }
        await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(contractAbi, contractAddress);
        const totalCoupons = await contract.methods.totalSupply().call();
        const couponList = [];

        for (let i = 0; i < totalCoupons; i++) {
          const coupon = await contract.methods.coupons(i).call();
          const metadataURL = coupon.tokenUri;
          const NFTURI = await fetch(convertIpfsUrl(metadataURL));
          const nftDetails = await NFTURI.json();

          let couponStatus = "Active";
          if (coupon.expiry < Date.now() / 1000) {
            couponStatus = "Expired";
          } else if (coupon.redeemed) {
            couponStatus = "Redeemed";
          }

          console.log("NFT DETAILS: ", nftDetails);

          couponList.push({
            tokenId: coupon.tokenId.toString(),
            value: coupon.value.toString(),
            expiry: coupon.expiry.toString(),
            owner: coupon.owner,
            name: nftDetails.name,
            description: nftDetails.description,
            status: couponStatus,
            image: convertIpfsUrlIntoImage(nftDetails.image),
          });
        }
        console.log("COUPON LIST:", couponList);
        setCouponData(couponList);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };

    fetchCoupons();
  }, []);

  return (
    <Grid
      container
      minHeight="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={10}>
        <Grid item xs={12}>
          <Typography variant="h4">Vouchers</Typography>
        </Grid>

        <Divider sx={{ mt: "20px", mb: "20px" }} />
        <Grid
          item
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          {couponData.map((voucher, index) => (
            <Card
              key={index}
              sx={{
                width: "250px",
                height: "250px",
                p: "10px",
                margin: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                backgroundColor: "#f5f5f5",
              }}
            >
              <CardHeader title={voucher.name} />

              <CardContent>
                {voucher.status === "Active" ? (
                  <Typography sx={{ fontSize: "12px", color: "#2E3B55" }}>
                    Expires on {voucher.expiry.slice(0, 10)}
                  </Typography>
                ) : voucher.status === "Redeemed" ? (
                  <Typography sx={{ fontSize: "12px", color: "#2E3B55" }}>
                    Redeemed on {voucher.redemptionDate.slice(0, 10)}
                  </Typography>
                ) : (
                  <Typography sx={{ fontSize: "12px", color: "#2E3B55" }}>
                    Expired on {new Date(voucher.expiry * 1000).toDateString()}
                  </Typography>
                )}

                <Typography>
                  {voucher.value} INR <br />{" "}
                </Typography>
                <Typography
                  sx={{
                    // red for expired vouchers, blue for redeemed, green for active
                    backgroundColor:
                      voucher.status === "Redeemed"
                        ? "#2E3B55"
                        : voucher.status === "Expired"
                        ? "#da2c38"
                        : "#4c956c",
                    color: "#ffffff",
                    borderRadius: "5px",
                    fontSize: "12px",
                    padding: "5px",
                    textAlign: "center",
                  }}
                >
                  {voucher.status}
                </Typography>

                {voucher.status === "Active" ? (
                  <CardActions>
                    {/* // pass the tokenId as a query parameter to the redeem page */}
                    <Button
                      size="small"
                      variant="contained"
                      href={`/redeem?tokenId=${voucher.tokenId}`}
                    >
                      Redeem
                    </Button>
                  </CardActions>
                ) : (
                  <CardActions>
                    <Button size="small" variant="contained" disabled>
                      Redeem
                    </Button>
                  </CardActions>
                )}
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Vouchers;
