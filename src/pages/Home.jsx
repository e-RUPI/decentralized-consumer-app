import { useWeb3Auth } from "../services/web3auth";
import { useState } from "react";
import { Grid, Typography } from "@mui/material";
import Bg from "../Assets/e-RUPI.jpg";

const Home = () => {
  const { getUserInfo } = useWeb3Auth();
  const [userInfo, setUserInfo] = useState(null);

  const fetchData = async () => {
    const info = await getUserInfo();
    setUserInfo(info);
  };

  return (
    <div>
      <Grid
        container
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item xs={10} sx={{ textAlign: "center" }}>
          <img
            src={Bg}
            alt="e-RUPI"
            style={{ width: "100%", height: "100%" }}
          />
        </Grid>

        <Grid item xs={10}>
          {/* <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#2E3B55",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            e-RUPI - Digital Payment Solution
          </Typography> */}

          <Typography
            variant="body2"
            sx={{
              color: "#2E3B55",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            e-RUPI is a digital solution launched by the Hon'ble PM via video
            conferencing to allow cashless payment solution for COVID-19
            vaccination. The digital payment solution has been developed with
            the support of DFS (Department of Financial Services) and NHA
            (National Health Authority) and is powered by National Payments
            Corporation of India (NPCI). This seamless one-time payment
            mechanism enables users to redeem the voucher without a card,
            digital payments app or internet banking access, at the merchants
            accepting UPI e-Prepaid Vouchers. The e-RUPI would be shared with
            the beneficiaries for a specific purpose or activity by
            organizations via SMS or QR code. This contactless e-RUPI is easy,
            safe and secure as it keeps the details of the beneficiaries
            completely confidential. The entire transaction process through this
            voucher is relatively faster and at the same time reliable, as the
            required amount is already stored in the voucher.
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
