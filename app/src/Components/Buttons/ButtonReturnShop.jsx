import React from "react";
import { Box, Button, Tooltip } from "@mui/material";
import { useAppContext } from "../../Contexts/AppContext";
import { useNavigate } from "react-router-dom";

export default function ButtonReturnShop(props) {
  const [appContext] = useAppContext();
  const navigate = useNavigate();

  return (
    <Box>
      <Tooltip title={props.title ? props.title : 'Continuar Comprando'}>
        <span>
          <Button
            variant="contained"
            onClick={() => 
              (!appContext.itemsCarShop ? navigate("/home") : null)
              (props.title ? navigate("/my/tests"): null)
          }
          >
            {props.title ? props.title : 'Continuar Comprando'}
          </Button>
        </span>
      </Tooltip>
    </Box>
  );
}
