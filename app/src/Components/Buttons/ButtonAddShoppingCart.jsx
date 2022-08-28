import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function ButtonAddShoppingCart() {
  return (
    <Box>
      <Button color="inherit">
        <AddShoppingCartIcon color="inherit" />
      </Button>
    </Box>
  );
}
