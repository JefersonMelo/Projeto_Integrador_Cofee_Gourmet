import * as React from "react";
import Box from "@mui/material/Box";
import { Main } from "../Pages/Config/MainStyle";
import { useAppContext } from "../Contexts/AppContext";
import { useUserContext } from "../Contexts/UserContext";
import GridBase12x3 from "../Components/Grids/GridBase12x3";
import CardHome from "../Components/Cards/CardHome";
import SwipeableTextMobileStepper from "../Components/Carousel/HomeUserCarousel";

export default function Home() {
  const [appContext] = useAppContext();
  const [userContext] = useUserContext();
  
  return (
    <Box sx={{ mt: 2, flexGrow: 12 }}>
      <Main open={appContext.drawerOpened} context={appContext}>
        <SwipeableTextMobileStepper/>
        <Box sx={{ mt: 5 }}>
          <GridBase12x3 Element={CardHome} />
        </Box>
      </Main>
    </Box>
  );
}
