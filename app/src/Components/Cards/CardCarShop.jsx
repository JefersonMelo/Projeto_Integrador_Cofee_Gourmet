import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  formatCurrencyBR,
  FromISODateHourTmzToDMY,
} from "../../Helpers/Formats";
import ImgCoffeeCup from "../../Static/Imgs/coffee-cup-and-beans.jpg";
import BasicRating from "../Rating/BasicRating";
import ButtonAddShoppingCar from "../Buttons/ButtonAddShoppingCar";
import { ExpandMore } from "./Style/CardStyle";

export default function CardCarShop({ id, row }) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  console.log(row);

  return (
    <Card sx={{ maxWidth: 345, elevation: 3 }} key={`${id}-${row.Products.ProductID}`}>
      <CardHeader title={row.Products.ProductName} />

      <CardMedia
        component="img"
        height="194"
        image={ImgCoffeeCup}
        alt="Coffee in Cup"
      />
      <CardContent>
        <BasicRating ratingValue={row.Products.TotalRating} />
        <Typography variant="body2" color="text.secondary">
          {row.Products.ShortDescription}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            <Typography id={"1"}>
              <strong>{row.Products.ProductName}</strong>
            </Typography>
            <Typography id={"3"}>
              Peso:{" "}
              {row.Products.WeightInGrams >= 1000
                ? `${row.Products.WeightInGrams / 1000}Kg`
                : `${row.Products.WeightInGrams}g`}
            </Typography>
            <Typography id={"4"}>{`Preço: ${formatCurrencyBR(
              row.Products.Price
            )}`}</Typography>
            <Typography id={"5"}>
              {row.Products.Discount
                ? `Desconto: ${row.Products.Discount}%`
                : null}
            </Typography>
            <Typography id={"6"}>
              Validade:{" "}
              {FromISODateHourTmzToDMY(row.Products.ValidityEndDate.toString())}
            </Typography>
          </Typography>
          {/* <Typography id={"7"} paragraph>
            {row.Products.FullDescription}
          </Typography> */}
        </CardContent>
      </Collapse>
    </Card>
  );
}
