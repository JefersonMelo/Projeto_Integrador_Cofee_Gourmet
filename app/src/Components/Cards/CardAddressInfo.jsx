import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useUserContext } from "../../Contexts/UserContext";
import { Box, CardHeader } from "@mui/material";
import EditAddressForm from "../Forms/EditAddressForm";
import BorderBox from "../Boxes/BorderBox";

export default function CardAddressInfo() {
  const [userContext] = useUserContext();
  const [edit, setEdit] = useState(false);

  return (
    <Box sx={{ mb: "2rem" }}>
      {!edit ? (
        <Card sx={{ minWidth: "200px" }}>
          <CardHeader
            sx={{ mb: -3 }}
            titleTypographyProps={{ variant: "h7" }}
            title={"Endereço de Entrega"}
            action={
              <Button onClick={() => setEdit(true)} size="small">
                Editar
              </Button>
            }
          />
          <CardContent>
            <Typography sx={{ fontSize: 16 }} color="text.secondary">
              {userContext.identification.Name}{" "}
              {userContext.identification.LastName}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary">
              {userContext.address.AddressName}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary">
              {userContext.address.AddressNumber},{" "}
              {userContext.address.Complement}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary">
              {userContext.address.City}, {userContext.address.ZipCode},{" "}
              {userContext.address.State}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <BorderBox
          Element={<EditAddressForm edit={edit} setEdit={setEdit} />}
        />
      )}
    </Box>
  );
}
