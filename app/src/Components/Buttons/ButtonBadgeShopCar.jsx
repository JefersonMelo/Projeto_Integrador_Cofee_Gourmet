import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import api from "../../Services/api";
import { apiRouts } from "../../Helpers/Globals";
import { useUserContext } from "../../Contexts/UserContext";
import { useAppContext } from "../../Contexts/AppContext";
import { ShowErrorSnackBar } from "../../Helpers/SnackBars";

export default function ButtonBadgeShopCar() {
  const [badgeContent, setBadgeContent] = useState(0);
  const [appContext, setAppContext] = useAppContext();
  const [userContext] = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    api.get(
        apiRouts.GET_CAR_SHOP_BY_USER_ID.replace(
          "%user_id%",
          userContext.userid
        )
      )
      .then((res) => {
        if (!!res.data.results) {
          setBadgeContent(res.data.results.length);
          // ShowSuccessSnackBar(res, appContext, setAppContext);
        } else {
          setBadgeContent(0);
        }
      })
      .catch((err) => {
        ShowErrorSnackBar(err, appContext, setAppContext);
        setBadgeContent(0);
      });
  }, [userContext.userid, appContext, setAppContext]);

  let err = { data: { detail: "Carrinho Vazio" } };

  return (
    <Box>
      <Button
        onClick={() =>
          badgeContent
            ? navigate("/user/car/shop")
            : ShowErrorSnackBar(err, appContext, setAppContext)
        }
        color="inherit"
      >
        <Badge badgeContent={badgeContent} color="primary">
          <ShoppingCartIcon color="inherit" />
        </Badge>
      </Button>
    </Box>
  );
}
