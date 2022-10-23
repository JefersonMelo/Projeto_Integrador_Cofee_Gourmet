import React from "react";
import { Box, Button, Tooltip } from "@mui/material";
import { useAppContext } from "../../Contexts/AppContext";
import { useNavigate } from "react-router-dom";

export default function ButtonReturnShop() {
  const [appContext] = useAppContext();
  const navigate = useNavigate();

  return (
    <Box>
      <Tooltip title="Retornar às Compras">
        <span>
          <Button
            variant="contained"
            onClick={() => (!appContext.itemsCarShop ? navigate("/home") : null)}
          >
            Retornar às Compras
          </Button>
        </span>
      </Tooltip>
    </Box>
  );
}
