import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useAppContext } from "../Contexts/AppContext";
import api from "../Services/api";
import { apiRouts } from "../Helpers/Globals";
import { Main } from "./Config/MainStyle";
import { ShowErrorSnackBar } from "../Helpers/SnackBars";
import { useUserContext } from "../Contexts/UserContext";
import ColumnStack from "../Components/Stacks/ColumnStack";
import CardCarShop from "../Components/Cards/CardCarShop";

export default function CarShopPage() {
  const [userContext] = useUserContext();
  const [appContext, setAppContext] = useAppContext();
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get(
        apiRouts.GET_CAR_SHOP_BY_USER_ID.replace(
          "%user_id%",
          userContext.userid
        )
      )
      .then((res) => {
        setItems(res.data.results);
      })
      .catch((err) => {
        ShowErrorSnackBar(err, appContext, setAppContext);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userContext.userid]);

  return (
    <Box sx={{ mt: 7, flexGrow: 12 }}>
      <Main open={appContext.drawerOpened} context={appContext}>
        <Box sx={{ mt: 5 }}>
          <ColumnStack Element={CardCarShop} values={items} />
        </Box>
      </Main>
    </Box>
  );
}
