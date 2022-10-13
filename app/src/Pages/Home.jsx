import * as React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { Main } from "../Pages/Config/MainStyle";
import { useAppContext } from "../Contexts/AppContext";
import { useUserContext } from "../Contexts/UserContext";
import GridBase12x3 from "../Components/Grids/GridBase12x3";
import CardHome from "../Components/Cards/CardHome";
// import ButtonTipWeek from "../Components/Buttons/ButtonTipWeek";

export default function Home() {
  const [appContext] = useAppContext();
  const [userContext] = useUserContext();
  
  return (
    <Box sx={{ mt: 7, flexGrow: 12 }}>
      <Main open={appContext.drawerOpened} context={appContext}>
        <Box sx={{ m: 2 }}>
          {/* <Paper>
            <Box
              component="img"
              sx={{ width: "100%", height: "300px" }}
              src={ImgCoffeeCup}
              alt="Xícara de Café. Dica da Semana"
            />
            <br />
            <ButtonTipWeek />
          </Paper> */}
          <Typography variant="h5">Home Usuário Conectado</Typography>
        </Box>
        <Box sx={{ mt: 5 }}>
          <GridBase12x3 Element={CardHome} />
        </Box>
      </Main>
    </Box>
  );
}
