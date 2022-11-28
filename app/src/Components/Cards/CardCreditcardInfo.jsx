import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useUserContext } from "../../Contexts/UserContext";
import { Box, CardHeader } from "@mui/material";
import EditCreditCardForm from "../Forms/EditCreditCardForm";
import BorderBox from "../Boxes/BorderBox";

export default function CardCreditcardInfo() {
  const [userContext] = useUserContext();
  const [edit, setEdit] = useState(false);
  const finalCard = `******${userContext.creditcard.CardNumber.slice(
    userContext.creditcard.CardNumber.length - 4
  )}`;

  return (
    <Box sx={{ mb: "2rem" }}>
      {!edit ? (
        <Card sx={{ minWidth: "200px" }}>
          <CardHeader
            sx={{ mb: -3 }}
            titleTypographyProps={{ variant: "h7" }}
            title={"Cartão de Crédito"}
            action={
              <Button onClick={() => setEdit(true)} size="small">
                Editar
              </Button>
            }
          />
          <CardContent>
            <Typography sx={{ fontSize: 16 }} color="text.secondary">
              {userContext.creditcard.UserName}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary">
              {userContext.creditcard.CardFlag}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary">
              termina em {finalCard}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary">
              {userContext.creditcard.Validity}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <BorderBox
          Element={<EditCreditCardForm edit={edit} setEdit={setEdit} />}
        />
      )}
    </Box>
  );
}
