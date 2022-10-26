import * as React from "react";
import Box from "@mui/material/Box";
import { Main } from "./Config/MainStyle";
import { useAppContext } from "../Contexts/AppContext";
// import { sssuseUserContext } from "../Contexts/AuthenticationContext";

export default function PaymentPage() {
  const [appContext] = useAppContext();
  // const [sssuserContext] = sssuseUserContext();

  return (
    <Box sx={{ mt: 2, flexGrow: 12 }}>
      <Main open={appContext.drawerOpened} context={appContext}>
        <Box sx={{ mt: 5 }}>PÁGINA DE PAGAMENTOS</Box>
      </Main>
    </Box>
  );
}
