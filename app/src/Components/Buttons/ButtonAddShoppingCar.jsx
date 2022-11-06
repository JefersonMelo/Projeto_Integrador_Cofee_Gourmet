import React from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useAuthContext } from "../../Contexts/AuthenticationContext";
import { apiRouts } from "../../Helpers/Globals";
import api from "../../Services/api";
import {
  ShowErrorSnackBar,
  ShowSuccessSnackBar,
} from "../../Helpers/SnackBars";
import { useAppContext } from "../../Contexts/AppContext";

export default function ButtonAddShoppingCar({ product }) {
  const [authContext] = useAuthContext();
  const [, setAppContext] = useAppContext();
  const navigate = useNavigate();

  const addCarItemCarShop = () => {
    let data = {
      FK_UserID: authContext?.userid,
      FK_ProductID: product?.ProductID,
    };

    api.post(apiRouts.ADD_NEW_ITEM_IN_CAR_SHOP, data)
      .then((res) => {
        ShowSuccessSnackBar(res, setAppContext);
      })
      .catch((err) => {
        ShowErrorSnackBar(err, setAppContext);
      });
  };

  return (
    <Box>
      <Tooltip
        arrow
        title={!authContext.token ? "Conecte-se" : "Adicionar ao Carrinho"}
      >
        <span>
          <Button
            color="inherit"
            onClick={() =>
              !authContext.token ? navigate("/login") : addCarItemCarShop()
            }
          >
            <AddShoppingCartIcon color="inherit" />
          </Button>
        </span>
      </Tooltip>
    </Box>
  );
}
