import React, {useEffect} from "react";
import Box from "@mui/material/Box";
import { Main } from "../Pages/Config/MainStyle";
import { useAppContext } from "../Contexts/AppContext";
import GridBase12x3 from "../Components/Grids/GridBase12x3";
import CardHome from "../Components/Cards/CardHome";
import SwipeableTextMobileStepper from "../Components/Carousel/HomeUserCarousel";
import api from "../Services/api";
import { apiRouts } from "../Helpers/Globals";
import { ShowErrorSnackBar } from "../Helpers/SnackBars";
import { useProductContext } from "../Contexts/ProductContext";

export default function Home() {
  const [appContext, setAppContext] = useAppContext();
  const [productContext, setProductContext] = useProductContext();

  useEffect(() => {
    api.get(apiRouts.GET_ALL_PRODUCTS)
      .then((res) => {
        setProductContext(() => ({
          ...productContext,
          products: res.data.results,
        }));
      })
      .catch((err) => {
        ShowErrorSnackBar(err, setAppContext);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
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
