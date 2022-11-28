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
import { Box } from "@mui/material";
import ButtonRemoveItemShop from "../Buttons/ButtonRemoveItemShop";
import { UseWindowSize } from "../../Helpers/UseWindowSize";
import { Theme } from "../../Helpers/Theme";
import { img } from "../../Static/img-products/Imgs";

export default function CardCarShop({ id, row }) {
  const [width] = UseWindowSize();
  const colors = Theme.palette;

  return (
    <Card
      sx={{
        elevation: 3,
        display: width >= 503 ? "flex" : "auto",
      }}
      key={`${id}-${row.Products.ProductID}`}
    >
      <CardMedia
        component="img"
        sx={{ width: '100%', height: 200  }}
        image={img(row.Products.ProductID)}
        alt="Coffee in Cup"
      />
      <Box>
        <CardHeader title={row.Products.ProductName} 
        action={
          <ButtonRemoveItemShop removeItem={row} id={id} />
        }/>

        <CardContent>
          <Typography
            paragraph
            color="text.secondary"
            component={"pre"}
            variant={"body2"}
          >
            <Typography id={"3"} component={"pre"} variant={"body2"}>
              Peso:{" "}
              {row.Products.WeightInGrams >= 1000
                ? `${row.Products.WeightInGrams / 1000}Kg`
                : `${row.Products.WeightInGrams}g`}
            </Typography>

            <Typography
              id={"4"}
              component={"pre"}
              variant={"body2"}
            >{`Preço: ${formatCurrencyBR(row.Products.Price)}`}</Typography>

            <Typography id={"5"} component={"pre"} variant={"body2"}>
              {row.Products.Discount
                ? `Desconto: ${row.Products.Discount}%`
                : null}
            </Typography>

            <Typography component={"pre"} variant={"body2"} sx={{color: colors.success.main}} id={"8"}>{row.Products.Discount ? `Com Desconto: ${formatCurrencyBR(row.Products.DiscountPrice)}`: null}</Typography>

            <Typography id={"6"} component={"pre"} variant={"body2"}>
              Validade:{" "}
              {FromISODateHourTmzToDMY(row.Products.ValidityEndDate.toString())}
            </Typography>
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
