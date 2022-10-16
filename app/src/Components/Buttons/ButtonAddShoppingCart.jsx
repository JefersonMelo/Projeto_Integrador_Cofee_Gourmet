import * as React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useUserContext } from "../../Contexts/UserContext";
import { Tooltip } from "@mui/material";

export default function ButtonAddShoppingCart() {
  const [userContext] = useUserContext();
  const navigate = useNavigate();
  return (
    <Box>
      <Tooltip
        arrow
        title={!userContext.token ? "Conecte-se" : "Adicionar ao Carrinho"}
      >
        <span>
          <Button
            color="inherit"
            onClick={() => (!userContext.token ? navigate("/login") : null)}
          >
            <AddShoppingCartIcon color="inherit" />
          </Button>
        </span>
      </Tooltip>
    </Box>
  );
}
