import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useAppContext } from "../Contexts/AppContext";
import api from "../Services/api";
import { apiRouts } from "../Helpers/Globals";
import { Main } from "./Config/MainStyle";
import { ShowErrorSnackBar } from "../Helpers/SnackBars";
import { useAuthContext } from "../Contexts/AuthenticationContext";
import ColumnStack from "../Components/Stacks/ColumnStack";
import CardCarShop from "../Components/Cards/CardCarShop";
import { Typography } from "@mui/material";
import ButtonPayment from "../Components/Buttons/ButtonPayment";
import { useCarShopContext } from "../Contexts/CarShopContext";

export default function CarShopPage() {
  const [authContext] = useAuthContext();
  const [appContext, setAppContext] = useAppContext();
  const [shopContext, setShopContext] = useCarShopContext();
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get(
        apiRouts.GET_CAR_SHOP_BY_USER_ID.replace(
          "%user_id%",
          authContext.userid
        )
      )
      .then((res) => {
        setItems(res.data.results);
        setShopContext((prev) => ({
          ...prev,
          itemsCarShop: res.data.results,
        }));
      })
      .catch((err) => {
        ShowErrorSnackBar(err, appContext, setAppContext);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appContext.refresh]);

  return (
    <Box sx={{ mt: 11, flexGrow: 12 }}>
      <Main open={appContext.drawerOpened} context={appContext}>
        <Box>
          <Box sx={{mb: '11px'}} >
            {shopContext.itemsCarShop?.length && (
              <Typography variant={"h4"}>Carrinho de compras</Typography>
            )}
          </Box>
          <ColumnStack Element={CardCarShop} values={items} />
        </Box>
        {shopContext.itemsCarShop?.length && (
          <Box>
            <ButtonPayment />
          </Box>
        )}
      </Main>
    </Box>
  );
}
