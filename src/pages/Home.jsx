// import { useWeb3Auth } from "../services/web3auth";
import {
  Grid,
  Typography,
  AppBar,
  Toolbar,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import Bg from "../Assets/e-RUPI.jpg";
import Cards from "../components/cards";

const vouchers = [
  {
    id: 1,
    name: "Redeem Voucher",
    description: "3",
    image: "https://cdn.dribbble.com/users/891507/screenshots/5706046/sale.gif",
  },
  {
    id: 2,
    name: "Active Voucher",
    description: "2",
    image:
      "https://i.pinimg.com/originals/0e/ed/cf/0eedcf1f924423380eb97e32fe34685d.gif",
  },
  {
    id: 3,
    name: "Expired Voucher",
    description: "1",
    image: "https://lordicon.com/icons/wired/lineal/759-ticket-coupon.gif",
  },
];

const Home = () => {
  // const { getUserInfo } = useWeb3Auth();
  // const [userInfo, setUserInfo] = useState(null);

  // const fetchData = async () => {
  //   const info = await getUserInfo();
  //   setUserInfo(info);
  // };

  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
        alignItems: "center",

        py: "20px",
      }}
    >
      {/* ------------------ e-RUPI -------------------------------------------- */}
      <Grid
        item
        xs={10}
        minHeight="100vh"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <AppBar position="static" sx={{ my: "20px" }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              e-RUPI
            </Typography>
          </Toolbar>
        </AppBar>
        <img src={Bg} alt="e-RUPI" style={{ width: "100%", height: "100%" }} />

        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            my: "20px",
          }}
        >
          What is <span style={{ color: "#fb5607" }}>e-RUPI</span>?
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#2E3B55",
          }}
        >
          e-RUPI is a digital solution launched by the Hon'ble PM via video
          conferencing to allow cashless payment solution for COVID-19
          vaccination. The digital payment solution has been developed with the
          support of DFS (Department of Financial Services) and NHA (National
          Health Authority) and is powered by National Payments Corporation of
          India (NPCI). This seamless one-time payment mechanism enables users
          to redeem the voucher without a card, digital payments app or internet
          banking access, at the merchants accepting UPI e-Prepaid Vouchers. The
          e-RUPI would be shared with the beneficiaries for a specific purpose
          or activity by organizations via SMS or QR code. This contactless
          e-RUPI is easy, safe and secure as it keeps the details of the
          beneficiaries completely confidential. The entire transaction process
          through this voucher is relatively faster and at the same time
          reliable, as the required amount is already stored in the voucher.
        </Typography>
      </Grid>

      {/* ----------------- Vouchers ------------------------------------------------- */}

      <Grid
        item
        xs={10}
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "70vh",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#2E3B55",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          Explore Vouchers
        </Typography>

        <Grid container sx={{ justifyContent: "center" }}>
          {vouchers.map((voucher) => (
            <Cards
              number={voucher.id}
              name={voucher.name}
              description={voucher.description}
              image={voucher.image}
            />
          ))}
        </Grid>
      </Grid>

      {/* -------------------- Schemes ---------------------------------------------- */}

      <Grid
        item
        xs={10}
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "70vh",
        }}
      >
        <Grid
          container
          sx={{
            my: "20px",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#2E3B55",
            }}
          >
            Explore Schemes
          </Typography>

          <Button href="/schemes" variant="text">
            Explore
          </Button>
        </Grid>

        <Card sx={{ display: "flex" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography variant="h5">
              Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              Ministry of Agriculture and Farmers' Welfare
            </Typography>

            <Typography
              sx={{
                fontSize: "20px",
                alignSelf: "center",
                m: "auto",
              }}
            >
              <br />
              <a href="https://pmkisan.gov.in/">Read More</a>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Home;
