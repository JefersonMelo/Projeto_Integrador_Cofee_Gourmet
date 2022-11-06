import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Theme } from "../../Helpers/Theme";
import { Box, Tooltip, Typography } from "@mui/material";
import api from "../../Services/api";
import { apiRouts } from "../../Helpers/Globals";
import { useAppContext } from "../../Contexts/AppContext";
import {
  ShowSuccessSnackBar,
  ShowErrorSnackBar,
} from "../../Helpers/SnackBars";

export default function ButtonRemoveItemShop({ removeItem, id }) {
  const colors = Theme.palette;
  const [, setAppContext] = useAppContext();

  const onSubmit = (val) => {
    const data = {
      CarShopID: val.CarShopID,
      FK_UserID: val.FK_UserID,
      FK_ProductID: val.FK_ProductID,
    };

    api.delete(apiRouts.DELETE_ITEM_CAR_SHOP, { data })
      .then((res) => {
        ShowSuccessSnackBar(res, setAppContext);
        setAppContext((prev) => ({
          ...prev,
          refresh: !prev.refresh,
        }));
      })
      .catch((err) => {
        ShowErrorSnackBar(err, setAppContext);
      });
  };
  return (
    <Box id={id}>
      <Tooltip title="Remover do Carrinho" arrow>
        <Typography component={'span'} variant={'body2'}>
          <IconButton
            sx={{ color: colors.error.main, size: "small" }}
            aria-label="delete"
            onClick={() => (onSubmit(removeItem))}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Typography>
      </Tooltip>
    </Box>
  );
}
