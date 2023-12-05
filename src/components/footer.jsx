import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { LinkedIn, Instagram, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material";
import Logo from "../Assets/logo.png";

export default function Footer() {
  return (
    <Grid container
      component="footer"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        p: 6,
      }}
    >
      <Container maxWidth="lg" 
      >
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <img src={Logo} alt="logo" width="100px" />
            <Typography variant="body2" color="text.secondary">
              National Payments Corporation of India (NPCI) in association with
              Department of Financial Services (DFS), National Health Authority
              (NHA), Ministry of Health and Family Welfare (MoHFW), and partner
              banks, has launched an innovative digital solution e-RUPI.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              India
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Corporate Identity Number (CIN) : U74990MH2008NPL189067
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Follow Us
            </Typography>
            <Link href="https://www.facebook.com/" color="inherit">
              <LinkedIn />
            </Link>
            <Link
              href="https://www.instagram.com/"
              color="inherit"
              sx={{ pl: 1, pr: 1 }}
            >
              <Instagram />
            </Link>
            <Link href="https://www.twitter.com/" color="inherit">
              <Twitter />
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography
            variant="h6"
            color="text.primary"
            align="center"
            gutterBottom
          >
            © 2023 NPCI. All rights reserved Scroll to Top
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://material-ui.com/">
              e-RUPI
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </Grid>
  );
}
