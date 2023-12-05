import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Divider,
  CardActions,
  CardHeader,
} from "@mui/material";
import axios from "axios";

const Vouchers = () => {
  const [vouchersData, setVouchersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:7070/vouchers");
        setVouchersData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
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
              ></CardActions>
            </Card>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Vouchers;
