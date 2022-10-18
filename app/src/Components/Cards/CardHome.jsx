import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { formatCurrencyBR, FromISODateHourTmzToDMY } from "../../Helpers/Formats";
import ImgCoffeeCup from "../../Static/Imgs/coffee-cup-and-beans.jpg";
import BasicRating from "../Rating/BasicRating";
import ButtonAddShoppingCar from "../Buttons/ButtonAddShoppingCar";
// import ShareIcon from "@mui/icons-material/Share";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CardHome({ id, row }) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345, elevation: 3 }} key={`${id}-${row.ProductID}`}>
      <CardHeader title={row.ProductName} />

      <CardMedia
        component="img"
        height="194"
        image={ImgCoffeeCup}
        alt="Coffee in Cup"
      />
      <CardContent>
        <BasicRating ratingValue={row.TotalRating}/>
        <Typography variant="body2" color="text.secondary">
          {row.ShortDescription}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ButtonAddShoppingCar product={row}/>

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
            <Typography id={"2"}>Fabricante: {row.Provider.ProviderName}</Typography>
            <Typography id={"3"}>Peso: {(row.WeightInGrams >= 1000) ? `${row.WeightInGrams}Kg`: `${row.WeightInGrams}g`}</Typography>
            <Typography id={"4"}>{`Preço: ${formatCurrencyBR(row.Price)}`}</Typography>
            <Typography id={"5"}>{row.Discount ? `Desconto: ${row.Discount}%` : null}</Typography>
            <Typography id={"6"}>Validade: {FromISODateHourTmzToDMY(row.ValidityEndDate.toString())}</Typography>
          </Typography>
          <Typography id={"7"} paragraph>{row.FullDescription}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
