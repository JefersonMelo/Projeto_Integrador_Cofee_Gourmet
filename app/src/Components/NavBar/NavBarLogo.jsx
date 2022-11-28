import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useAppContext } from "../../Contexts/AppContext";

export const NavBarLogo = () => {
  const navigate = useNavigate();
  const [, setAppContext] = useAppContext();

  const handleDrawerClose = () => {
    setAppContext((appContext) => ({
      ...appContext,
      drawerOpened: false,
    }));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Button
        onClick={() => {
          navigate("/home");
          handleDrawerClose();
        }}
        sx={{ color: "inherit" }}
      >
        COFFEE BREAK
      </Button>
    </Box>
  );
};
