import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Theme } from "../../Helpers/Theme";

export const NavBarLogo = () => {
  const colors = Theme.palette;
  return (
    <Box
      component={Link}
      sx={{
        flexGrow: 1,
        position: "relative",
        textDecoration: "none",
        color: colors.dropzone.grey98,
      }}
      to={{ pathname: "/" }}
    >
      <Typography variant="h6" component="div">
        COFFEE BREAK
      </Typography>
    </Box>
  );
};
