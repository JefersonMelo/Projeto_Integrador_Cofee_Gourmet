import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function BadgeShoppingCar({ badgeContent }) {
  return (
    <Box>
      <Button color="inherit">
        <Badge badgeContent={badgeContent} color="primary">
          <ShoppingCartIcon color="inherit" />
        </Badge>
      </Button>
    </Box>
  );
}
