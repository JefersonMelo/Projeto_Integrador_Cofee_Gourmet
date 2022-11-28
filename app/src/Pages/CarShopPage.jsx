import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useAppContext } from "../Contexts/AppContext";
import api from "../Services/api";
import { apiRouts } from "../Helpers/Globals";
import { Main } from "./Config/MainStyle";
import { ShowErrorSnackBar } from "../Helpers/SnackBars";
import { useAuthContext } from "../Contexts/AuthenticationContext";
import ColumnStack from "../Components/Stacks/ColumnStack";
import CardCarShop from "../Components/Cards/CardCarShop";
import ButtonInfoValidation from "../Components/Buttons/ButtonInfoValidation";
import { useCarShopContext } from "../Contexts/CarShopContext";
import ButtonReturnShop from "../Components/Buttons/ButtonReturnShop";
import { UseWindowSize } from "../Helpers/UseWindowSize";

export default function CarShopPage() {
  const [authContext] = useAuthContext();
  const [appContext, setAppContext] = useAppContext();
  const [shopContext, setShopContext] = useCarShopContext();
  const [items, setItems] = useState([]);
  const [width] = UseWindowSize();
  const navigate = useNavigate();


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
        ShowErrorSnackBar(err, setAppContext);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appContext.refresh]);

  return (
    <Box sx={{ mt: 11, flexGrow: 12 }}>
      <Main open={appContext.drawerOpened} context={appContext}>
        {shopContext.itemsCarShop?.length ? (
          <Box
            sx={{
              mb: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: width >= 530 ? "flex-end": "flex-start",
            }}
          >
            <ButtonReturnShop />
          </Box>
        ): navigate("/home")}

        <Box>
          <Box sx={{ mb: "17px" }}>
            {shopContext.itemsCarShop?.length && (
              <Typography variant={"h5"}>Carrinho de compras</Typography>
            )}
          </Box>
          <ColumnStack Element={CardCarShop} values={items} />
        </Box>
        {shopContext.itemsCarShop?.length && (
          <Box>
            <ButtonInfoValidation />
          </Box>
        )}
      </Main>
    </Box>
  );
}
