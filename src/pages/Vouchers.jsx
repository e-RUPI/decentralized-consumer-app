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
  Box,
  Modal,
} from "@mui/material";
// import axios from "axios";
import Web3 from "web3";
import { agricultureContract, NFTAbi } from "../constants/data";
import { IProvider } from "@web3auth/base";

const contractAddress = agricultureContract;
const contractAbi = NFTAbi;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "20px",
};

const Vouchers = () => {
  const [vouchersData, setVouchersData] = useState([]);
  const [modalData, setModalData] = useState({});
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:7070/vouchers");
  //       setVouchersData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  function convertIpfsUrl(ipfsUrl) {
    const hash = ipfsUrl.match(/ipfs:\/\/([a-zA-Z0-9]+)/)[1];
    return `https://${hash}.ipfs.nftstorage.link/metadata.json`;
  }

  function convertIpfsUrlIntoImage(ipfsUrl) {
    const hash = ipfsUrl.match(/ipfs:\/\/([a-zA-Z0-9]+)/)[1];
    return `https://${hash}.ipfs.nftstorage.link/image.jpg`;
  }

  // const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        if (typeof window.ethereum === "undefined") {
          alert("Please install MetaMask first.");
          return;
        }

        window.addEventListener("load", async () => {
          try {
            await window.ethereum.request({
              method: "eth_requestAccounts",
            });
          } catch (error) { }
        });

        const web3 = new Web3(window.ethereum);
        // const contract = new ethers.Contract(contractAddress, contractAbi,);

        // const totalCoupons = await contract.totalSupply();
        // const couponList = [];


        // for (let i = 0; i < totalCoupons; i++) {
        //     const coupon = await contract.coupons(i);
        //     const metadataURL = coupon.tokenUri;
        //     // const NFTURI = await axios.get(`https://nftstorage.link/ipfs/${metadataURL.slice(7)}`);
        //     const NFTURI = await fetch(convertIpfsUrl(metadataURL))
        const contract = new web3.eth.Contract(contractAbi, contractAddress);

        const totalCoupons = await contract.methods.totalSupply().call();
        const couponList = [];

        for (let i = 0; i < totalCoupons; i++) {
          const coupon = await contract.methods.coupons(i).call();
          const metadataURL = coupon.tokenUri;
          // Use fetch for simplicity, you can replace it with your preferred HTTP library
          const NFTURI = await fetch(convertIpfsUrl(metadataURL));


          const nftDetails = await NFTURI.json();

          console.log("NFT DETAILS: ", nftDetails)

          couponList.push({
            tokenId: coupon.tokenId.toString(),
            value: coupon.value.toString(),
            expiry: coupon.expiry.toString(),
            owner: coupon.owner,
            name: nftDetails.name,
            description: nftDetails.description,
            image: convertIpfsUrlIntoImage(nftDetails.image),
          });
        }
        console.log("COUPON LIST:", couponList)
        // setCoupons(couponList);
        setVouchersData(couponList);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };

    fetchCoupons();
  }, []);


  // createdAt: "2023-12-05T18:59:01.141Z";
  // eRupiId: "QD129312";
  // expiry: "2024-01-03T00:00:00.000Z";
  // issueDate: "2023-01-10T00:00:00.000Z";
  // maxAmount: 1000;
  // mcc: 5912;
  // purpose: "Healthcare Drug Coverage";
  // redemptionDate: "2023-08-08T00:00:00.000Z";
  // status: "Redeemed";
  // usedAmount: 1000;
  // user: "D4253";
  // _id: "65301f0bd1fe3327a634b2a5";

  console.log("vouchersData:", vouchersData);

  return (
    <Grid
      container
      sx={{
        mt: "150px",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <Grid item xs={10}>
        <Grid item xs={12}>
          <Typography variant="h4">Vouchers</Typography>
        </Grid>

        <Divider sx={{ mt: "20px", mb: "20px" }} />
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          {vouchersData.map((voucher) => (
            <Card
              key={voucher._id}
              sx={{
                width: "200px",
                margin: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                backgroundColor: "#f5f5f5",
              }}
            >
              <CardHeader
                sx={{
                  fontWeight: "bold",
                  color: "#2E3B55",
                  height: "60px",
                }}
                title={voucher.purpose}
              />

              <CardContent
                sx={{
                  height: "100%",
                }}
              >
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
                  <Typography sx={{ fontSize: "12px", color: "#2E3B55" }}>
                    Expires on {voucher.expiry.slice(0, 10)}
                  </Typography>
                ) : voucher.status === "Redeemed" ? (
                  <Typography sx={{ fontSize: "12px", color: "#2E3B55" }}>
                    Redeemed on {voucher.redemptionDate.slice(0, 10)}
                  </Typography>
                ) : (
                  <Typography sx={{ fontSize: "12px", color: "#2E3B55" }}>
                    Expired on {voucher.expiry.slice(0, 10)}
                  </Typography>
                )}

                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "#2E3B55",
                    fontWeight: "bold",
                  }}
                >
                  {voucher.maxAmount} INR
                </Typography>
              </CardContent>
              <CardActions
                sx={{
                  justifyContent: "center",
                }}
              >
                {voucher.status === "Active" ? (
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#2E3B55",
                      color: "#ffffff",
                      fontWeight: "bold",
                    }}
                    // pass voucher data to modal
                    onClick={() => {
                      handleOpen();
                      setModalData(voucher);
                    }}
                  >
                    Redeem
                  </Button>
                ) : null}
              </CardActions>
            </Card>
          ))}
        </Grid>

        <Modal
          open={open}
          onClose={handleClose}
          sx={{
            backdropFilter: "blur(1px)",
          }}
        >
          <Box sx={style}>
            <Typography
              component="h2"
              sx={{
                fontWeight: "bold",
                color: "#2E3B55",
              }}
            >
              {modalData.purpose}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {modalData.maxAmount} INR <br />
              Status : {modalData.status} <br />
              Expiry : {modalData.expiry} <br />
              Redeemable at : {modalData.mcc} <br />
            </Typography>

            <Button variant="contained" sx={{ mt: "20px" }}>
              Redeem
            </Button>
          </Box>
        </Modal>
      </Grid>
    </Grid>
  );
};

export default Vouchers;
