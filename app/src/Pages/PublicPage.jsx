import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useAppContext } from "../Contexts/AppContext";
import { useProductContext } from "../Contexts/ProductContext";
import GridBase12x3 from "../Components/Grids/GridBase12x3";
import api from "../Services/api";
import { apiRouts } from "../Helpers/Globals";
import CardHome from "../Components/Cards/CardHome";
import ButtonTipWeek from "../Components/Buttons/ButtonTipWeek";
import ImgCoffeeCup from "../Static/img-products/coffee-cup-and-beans.jpg";
import { Main } from "../Pages/Config/MainStyle";
import { ShowErrorSnackBar } from "../Helpers/SnackBars";

export default function PublicPage() {
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
    <Box sx={{ mt: 7, flexGrow: 12 }}>
      <Main open={appContext.drawerOpened} context={appContext}>
        <Box sx={{ m: 2 }}>
          <Paper>
            <Box
              component="img"
              sx={{ width: "100%", height: "300px" }}
              src={ImgCoffeeCup}
              alt="Xícara de Café. Dica da Semana"
            />
            <br />
            <ButtonTipWeek />
          </Paper>
        </Box>
        <Box sx={{ mt: 5 }}>
          <GridBase12x3 Element={CardHome} />
        </Box>
      </Main>
    </Box>
  );
}
