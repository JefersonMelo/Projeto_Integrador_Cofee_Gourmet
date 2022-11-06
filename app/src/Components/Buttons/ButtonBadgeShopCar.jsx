import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import api from "../../Services/api";
import { apiRouts } from "../../Helpers/Globals";
import { useAuthContext } from "../../Contexts/AuthenticationContext";
import { useAppContext } from "../../Contexts/AppContext";
import { ShowErrorSnackBar } from "../../Helpers/SnackBars";
import { useCarShopContext } from "../../Contexts/CarShopContext";

export default function ButtonBadgeShopCar() {
  const [appContext, setAppContext] = useAppContext();
  const [shopContext, setShopContext] = useCarShopContext();
  const [authContext] = useAuthContext();
  const navigate = useNavigate();
  const err = { data: { detail: "Carrinho Vazio" } };

  useEffect(() => {
    api.get(
        apiRouts.GET_CAR_SHOP_BY_USER_ID.replace(
          "%user_id%",
          authContext.userid
        )
      )
      .then((res) => {
        if (!!res.data.results) {
          setShopContext((prev) => ({
            ...prev,
            itemsCarShop: res.data.results,
          }));
        } 
      })
      .catch((err) => {
        ShowErrorSnackBar(err, setAppContext);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appContext.refresh]);

  return (
    <Box>
      <Button
        onClick={() =>
          shopContext.itemsCarShop?.length
            ? navigate("/user/car/shop")
            : ShowErrorSnackBar(err, setAppContext)
        }
        color="inherit"
      >
        <Badge badgeContent={shopContext.itemsCarShop?.length} color="primary">
          <ShoppingCartIcon color="inherit" />
        </Badge>
      </Button>
    </Box>
  );
}
