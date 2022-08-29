import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { formtCurrencyBR } from "../../Helpers/Formats";
import ImgCoffeeCup from "../../Static/Imgs/coffee-cup-and-beans.jpg";
import BasicRating from "../Rating/BasicRating";
import ButtonAddShoppingCart from "../Buttons/ButtonAddShoppingCart"

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
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345, elevation: 3 }} key={`${id}-${row.ProdutoID}`}>
      <CardHeader title={row.ProdutoNome} />

      <CardMedia
        component="img"
        height="194"
        image={ImgCoffeeCup}
        alt="Coffee in Cup"
      />
      <CardContent>
        <BasicRating />
        <Typography variant="body2" color="text.secondary">
          {row.DescResumida}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>

        <ButtonAddShoppingCart />

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
            <Typography>
              <strong>{row.ProdutoNome}</strong>
            </Typography>
            <Typography>{row.Fornecedor}</Typography>
            <Typography>{row.Peso}Kg</Typography>
            <Typography>{formtCurrencyBR(row.Valor)}</Typography>
          </Typography>

          <Typography paragraph>{row.DescDetalhada}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
