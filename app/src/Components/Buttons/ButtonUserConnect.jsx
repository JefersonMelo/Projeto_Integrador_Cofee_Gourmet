import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";

export default function ButtonUserConnect() {
  const navigate = useNavigate();
  return (
    <Box>
      <Tooltip 
      arrow
      title={"Conecte-se"}
      >
        <span>
          <Button color="inherit" onClick={() => navigate("/login")}>
            <PersonIcon />
          </Button>
        </span>
      </Tooltip>
    </Box>
  );
}
