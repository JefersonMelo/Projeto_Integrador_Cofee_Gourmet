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
import BasicRating from "../Rating/BasicRating";
import ButtonAddShoppingCar from "../Buttons/ButtonAddShoppingCar";
import { ExpandMore } from "./Style/CardStyle";
import { Theme } from "../../Helpers/Theme";
import { img } from "../../Static/img-products/Imgs";

export default function CardHome({ id, row }) {
  const [expanded, setExpanded] = useState(false);
  const colors = Theme.palette;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{ maxWidth: "auto", elevation: 3 }}
      key={`${id}-${row.ProductID}`}
    >
      <CardHeader title={row.ProductName} />

      <CardMedia
        component="img"
        sx={{ width: '100%', height: 200  }}
        image={img(row.ProductID)}
        alt="Coffee in Cup"
      />
      <CardContent>
        <BasicRating ratingValue={row.TotalRating} />
        <Typography variant="body2" color="text.secondary">
          {row.ShortDescription}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ButtonAddShoppingCar product={row} />

        {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
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
              <strong>{row.ProductName}</strong>
            </Typography>
            <Typography id={"2"}>
              Fabricante:{" "}
              {row.ProductName === "J" ||
              row.ProductName === "E" ||
              row.ProductName === "F"
                ? "Ana e José"
                : row.Provider.ProviderName}
            </Typography>
            <Typography id={"3"}>
              Peso:{" "}
              {row.WeightInGrams >= 1000
                ? `${row.WeightInGrams / 1000}Kg`
                : `${row.WeightInGrams}g`}
            </Typography>
            <Typography id={"4"}>{`Preço: ${formatCurrencyBR(
              row.Price
            )}`}</Typography>
            <Typography id={"5"}>
              {row.Discount ? `Desconto: ${row.Discount}%` : null}
            </Typography>
            <Typography sx={{ color: colors.success.main }} id={"8"}>
              {row.Discount
                ? `Com Desconto: ${formatCurrencyBR(row.DiscountPrice)}`
                : null}
            </Typography>
            <Typography id={"6"}>
              Validade:{" "}
              {FromISODateHourTmzToDMY(row.ValidityEndDate.toString())}
            </Typography>
          </Typography>
          <Typography id={"7"} paragraph>
            {row.FullDescription}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
