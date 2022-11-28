import React from "react";
import Box from "@mui/material/Box";
import { UseWindowSize } from "../../Helpers/UseWindowSize";

export default function BorderBox({ Element, ...props }) {
  const [width] = UseWindowSize();

  return (
    <Box
      sx={{ width: "auto" }}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        minWidth={width <= 500 ? "98%" : "auto"}
        sx={{
          boxShadow: 3,
          p: 2,
          border: 1,
          height: "auto",
          width: width >= 503 ? "75%" : "auto",
          borderRadius: 3,
          mt: props.liginOrRegistration ? "7%" : 1,
        }}
      >
        {typeof Element === "function" ? <Element /> : Element}
      </Box>
    </Box>
  );
}
