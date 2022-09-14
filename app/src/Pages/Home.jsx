import * as React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { Main } from "../Pages/Config/MainStyle";
import { useAppContext } from "../Contexts/AppContext";


export default function Home() {
  const [appContext, ] = useAppContext();
  return (
    <Box sx={{ mt: 7, flexGrow: 12 }}>
    <Main open={appContext.drawerOpened} context={appContext}>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h5">Home Usuário Conectado</Typography>
    </Box>
    </Main>
    </Box> 
  );
}
