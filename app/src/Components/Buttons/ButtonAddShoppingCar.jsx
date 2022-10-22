import React from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useUserContext } from "../../Contexts/UserContext";
import { apiRouts } from "../../Helpers/Globals";
import api from "../../Services/api";
import {
  ShowErrorSnackBar,
  ShowSuccessSnackBar,
} from "../../Helpers/SnackBars";
import { useAppContext } from "../../Contexts/AppContext";

export default function ButtonAddShoppingCar({ product }) {
  const [userContext] = useUserContext();
  const [appContext, setAppContext] = useAppContext();
  const navigate = useNavigate();

  const addCarItemCarShop = () => {
    let data = {
      FK_UserID: userContext.userid,
      FK_ProductID: product.ProductID,
    };

    api.post(apiRouts.ADD_NEW_ITEM_IN_CAR_SHOP, data)
      .then((res) => {
        ShowSuccessSnackBar(res, appContext, setAppContext);
      })
      .cath((err) => {
        ShowErrorSnackBar(err, appContext, setAppContext);
      });
  };

  return (
    <Box>
      <Tooltip
        arrow
        title={!userContext.token ? "Conecte-se" : "Adicionar ao Carrinho"}
      >
        <span>
          <Button
            color="inherit"
            onClick={() =>
              !userContext.token ? navigate("/login") : addCarItemCarShop()
            }
          >
            <AddShoppingCartIcon color="inherit" />
          </Button>
        </span>
      </Tooltip>
    </Box>
  );
}
