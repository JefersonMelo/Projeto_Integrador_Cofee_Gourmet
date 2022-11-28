import React from "react";
import Box from "@mui/material/Box";
import { Main } from "./Config/MainStyle";
import { Typography } from "@mui/material";
import { useAppContext } from "../Contexts/AppContext";
import CardPayment from "../Components/Cards/CardPayment";
import CardTanks from "../Components/Cards/CardTanks";


export default function PagePayment() {
  const [appContext] = useAppContext();

  return (
    <Box sx={{ mt: 2, flexGrow: 12 }}>
      <Main open={appContext.drawerOpened} context={appContext}>
        <Box
          sx={{
            mt: 7,
            mb: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">PÁGINA DE PAGAMENTO</Typography>
        </Box>
        <CardPayment/>
        <Box sx={{mt: '3rem'}} >
        <CardTanks/>
        </Box>
   
      </Main>
    </Box>
  );
}
