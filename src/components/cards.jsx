import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

export default function Cards(props) {
  const { name, image, number } = props;

  return (
    <Card
      key={number}
      sx={{
        width: "300px",
        height: "auto",
        margin: "20px",
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardMedia
        component="img"
        image={image}
        alt="vouchers"
        sx={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            color: "#2E3B55",
          }}
          variant="h5"
          component="div"
        >
          {name}
        </Typography>
        <Button href="/vouchers" size="small" color="primary">
          <ArrowCircleRightIcon
            sx={{
              color: "#e76f51",
            }}
          />
        </Button>
      </CardContent>
    </Card>
  );
}
