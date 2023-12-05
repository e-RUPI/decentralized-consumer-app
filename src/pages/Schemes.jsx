import { Grid, Typography, CardContent, Card, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Schemes() {
  const [schemes, setSchemes] = useState([]);
  // https://erupi.vercel.app/api/schemes

  useEffect(() => {
    axios
      .get("https://erupi.vercel.app/api/schemes")
      .then((res) => {
        setSchemes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Grid
      container
      sx={{
        mt: "150px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid item xs={10}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#2E3B55",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          Explore Schemes
        </Typography>

        <Divider />

        {schemes.map((scheme) => (
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              my: "10px",
            }}
          >
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography variant="h5">{scheme.title}</Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {scheme.organization}
              </Typography>

              <Typography
                sx={{
                  fontSize: "20px",
                  alignSelf: "center",
                  m: "auto",
                }}
              >
                <br />
                <a href={scheme.link}>Read More</a>
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Grid>
  );
}
