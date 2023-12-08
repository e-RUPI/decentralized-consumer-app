import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import TagFacesIcon from "@mui/icons-material/TagFaces";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function ChipsArray() {
  const [chipData] = React.useState([
    { key: 0, label: "All" },
    { key: 1, label: "Agriculture" },
    { key: 2, label: "Education" },
    { key: 3, label: "Healthcare" },
    { key: 4, label: "Food" },
    { key: 5, label: "Transport" },
    { key: 6, label: "Others" },
  ]);

  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        listStyle: "none",
        boxShadow: "none",
      }}
      component="ul"
    >
      {chipData.map((data) => {
        let icon;

        if (data.label === "React") {
          icon = <TagFacesIcon />;
        }

        return (
          <ListItem key={data.key}>
            <Chip
              sx={{
                borderRadius: "5px",
                "&:hover": {
                  border: "1px solid black",
                  cursor: "pointer",
                },
              }}
              icon={icon}
              label={data.label}
            />
          </ListItem>
        );
      })}
    </Paper>
  );
}
