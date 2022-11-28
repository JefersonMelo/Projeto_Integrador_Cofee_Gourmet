import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useUserContext } from "../../Contexts/UserContext";
import { Box, CardHeader } from "@mui/material";
import EditContactForm from "../Forms/EditContactForm";
import BorderBox from "../Boxes/BorderBox";

export default function CardContactsInfo() {
  const [userContext] = useUserContext();
  const [edit, setEdit] = useState(false);

  return (
    <Box sx={{ mb: "2rem" }}>
      {!edit ? (
        <Card sx={{ minWidth: "200px" }}>
          <CardHeader
            sx={{ mb: -3 }}
            titleTypographyProps={{ variant: "h7" }}
            title={"Contatos"}
            action={
              <Button onClick={() => setEdit(true)} size="small">
                Editar
              </Button>
            }
          />
          <CardContent>
            <Typography sx={{ fontSize: 16 }} color="text.secondary">
              <strong>Principal: </strong>
              {userContext.contacts.Phone_1}
            </Typography>
            <Typography sx={{ fontSize: 16 }} color="text.secondary">
              <strong>Secundário: </strong>
              {userContext.contacts.Phone_1}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <BorderBox
          Element={<EditContactForm edit={edit} setEdit={setEdit} />}
        />
      )}
    </Box>
  );
}
