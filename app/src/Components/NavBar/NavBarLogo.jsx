import React from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const NavBarLogo = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Button
        onClick={() => {
          navigate("/");
        }}
        sx={{ color: "inherit" }}
      >
        COFFEE BREAK
      </Button>
    </Box>
  );
};
