import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  formatCurrencyBR,
  FromISODateHourTmzToDMY,
} from "../../Helpers/Formats";
import ImgCoffeeCup from "../../Static/Imgs/coffee-cup-and-beans.jpg";
import { Box } from "@mui/material";
import ButtonRemoveItemShop from "../Buttons/ButtonRemoveItemShop";

export default function CardCarShop({ id, row }) {
 
  return (
    <Card
      sx={{ minWidth: "50%", elevation: 3, display: "flex" }}
      key={`${id}-${row.Products.ProductID}`}
    >
      <CardMedia
        component="img"
        height="250px"
        
        image={ImgCoffeeCup}
        alt="Coffee in Cup"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardHeader title={row.Products.ProductName} />

        <CardContent>
            <Typography paragraph color="text.secondary">
              <Typography id={"3"}>
                Peso:{" "}
                {row.Products.WeightInGrams >= 1000
                  ? `${row.Products.WeightInGrams / 1000}Kg`
                  : `${row.Products.WeightInGrams}g`}
              </Typography>

              <Typography id={"4"} component={'pre'}>{`Preço: ${formatCurrencyBR(row.Products.Price)}`}</Typography>
              
              <Typography id={"5"} component={'pre'}>
                {row.Products.Discount
                  ? `Desconto: ${row.Products.Discount}%`
                  : null}
              </Typography>
              
              <Typography id={"6"} component={'pre'}>
                Validade: {FromISODateHourTmzToDMY(row.Products.ValidityEndDate.toString())}
              </Typography>
              
            </Typography>
          </CardContent>

        <CardContent sx={{mt: -3, ml: -2}}>
          <ButtonRemoveItemShop removeItem={row} id={id}/>
        </CardContent>

      </Box>
    </Card>
  );
}
