import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { formatCurrencyBR } from "../../Helpers/Formats";
import PaymentImg from "../../Static/img-payment/payment.jpg";
import { Box, Divider } from "@mui/material";
import { UseWindowSize } from "../../Helpers/UseWindowSize";
import { Theme } from "../../Helpers/Theme";
import api from "../../Services/api";
import { apiRouts } from "../../Helpers/Globals";
import { useAuthContext } from "../../Contexts/AuthenticationContext";
import { ShowErrorSnackBar } from "../../Helpers/SnackBars";
import { useAppContext } from "../../Contexts/AppContext";

export default function CardPayment() {
  const [width] = UseWindowSize();
  const [, setAppContext] = useAppContext();
  const [items, setItems] = useState([]);
  const [authContext] = useAuthContext();
  const colors = Theme.palette;

  useEffect(() => {
    api.get(
        apiRouts.GET_PAYMENT_BY_USER_ID.replace("%user_id%", authContext.userid)
      )
      .then((res) => {
        setItems(res.data.results);
      })
      .catch((err) => {
        ShowErrorSnackBar(err, setAppContext);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return items ? (
    <Card
      sx={{
        elevation: 3,
        display: width >= 503 ? "flex" : "auto",
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: width >= 503 ? "40%" : "100%", height: 200 }}
        image={PaymentImg}
        alt="Pay Hand"
      />
      <Box>
        <CardHeader title={"Resumo do Pagamento"} />

        <CardContent>
          <Typography
            paragraph
            color="text.secondary"
            component={"pre"}
            variant={"body2"}
          >
            <Typography id={"3"} component={"pre"} variant={"body2"}>
              {`Quantidade de Itens: ${items.Qtd}`}
            </Typography>

            <Typography
              sx={{ mt: 0.5 }}
              id={"4"}
              component={"pre"}
              variant={"body2"}
            >{`Total Sem Desconto: ${formatCurrencyBR(
              items.CarValue
            )}`}</Typography>

            <Divider sx={{ mb: 1 }} />

            {items.CarValue !== items.CarWithDiscount && (
              <Typography
                sx={{ mt: 0.5, color: colors.success.main }}
                id={"5"}
                component={"pre"}
                variant={"body2"}
              >
                {`Total Com Desconto: ${formatCurrencyBR(
                  items.CarWithDiscount
                )}`}
              </Typography>
            )}

            {items.CarWithDiscount > 200 ? (
              <Typography
                component={"pre"}
                sx={{ mt: 0.5 }}
                variant={"body2"}
                id={"8"}
              >
                {`Frete e Manuseio: ${formatCurrencyBR(0)}`}
              </Typography>
            ) : (
              <Typography
                component={"pre"}
                sx={{ mt: 0.5 }}
                variant={"body2"}
                id={"8"}
              >
                {`Frete e Manuseio: ${formatCurrencyBR(30)}`}
              </Typography>
            )}

            <Divider sx={{ mb: 1 }} />
            {items.CarWithDiscount > 200 ? (
              <Typography
                component={"pre"}
                sx={{ mt: 0.5, color: colors.error.main }}
                variant={"body2"}
                id={"8"}
              >
                {`Total a Pagar: ${formatCurrencyBR(items.CarWithDiscount)}`}
              </Typography>
            ) : (
              <Typography
                component={"pre"}
                sx={{ mt: 0.5, color: colors.error.main }}
                variant={"body2"}
                id={"8"}
              >
                {`Total a Pagar: ${formatCurrencyBR(
                  items.CarWithDiscount + 30
                )}`}
              </Typography>
            )}
          </Typography>

          <Typography variant={"h6"} id={"8"}>
            {`Fim`}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  ) : null;
}
