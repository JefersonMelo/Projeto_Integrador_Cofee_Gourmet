import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
// import axios from "axios";
// import { useAppContext } from "../../Contexts/AppContext";
// import { useUserContext } from "../../Contexts/UserContext";
// import { apiRouts } from "../../Helpers/Globals";
// import api from "../../Services/api";
// import { useAuthContext } from "../../Contexts/AuthenticationContext";
// import { ShowErrorSnackBar } from "../../Helpers/SnackBars";

export default function ButtonPayment() {
//   const [userContext, setUserContext] = useUserContext();
//   const [, setAppContext] = useAppContext();
//   const [authContext] = useAuthContext();
  const navigate = useNavigate();

  return (
    <Box>
      <Button
        sx={{ mt: "20px", width: "100%" }}
        variant="contained"
        onClick={() => navigate("/payment")}
      >
        Seguir Para Pagamento
      </Button>
    </Box>
  );
}
