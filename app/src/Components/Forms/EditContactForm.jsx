import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, Stack, TextField } from "@mui/material";
import { useAppContext } from "../../Contexts/AppContext";
import { useAuthContext } from "../../Contexts/AuthenticationContext";
import api from "../../Services/api";
import { apiRouts } from "../../Helpers/Globals";
import {
  ShowErrorSnackBar,
  ShowSuccessSnackBar,
} from "../../Helpers/SnackBars";
import { useUserContext } from "../../Contexts/UserContext";

export default function EditContactForm(props) {
  const [, setAppContext] = useAppContext();
  const [authContext] = useAuthContext();
  const [userContext, setUserContext] = useUserContext();
  const [phoneNumber, setPhoneNumber] = useState(userContext.contacts.Phone_1);
  const [towNumber, setTwoNumber] = useState(userContext.contacts.Phone_2);
  const [isEdit, setIsEdit] = useState(false);

  const onSubmit = () => {
    let data = {
      FK_UserID: authContext.userid,
      Phone_1: phoneNumber,
      Phone_2: towNumber,
      Modified: null,
      ModifiedBy: authContext.username,
    };

    if (!phoneNumber) return;
    setIsEdit(false);

    api.put(
        apiRouts.EDIT_CONTACTS_BY_USER_ID.replace(
          "%user_id%",
          authContext.userid
        ),
        data
      )
      .then((res) => {
        setUserContext((prev) => ({
          ...prev,
          contacts: res.data.results,
        }));
        ShowSuccessSnackBar(res, setAppContext);
      })
      .catch((err) => {
        setIsEdit(true);
        ShowErrorSnackBar(err, setAppContext);
      });
  };

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="flex-start">
        <Typography variant="h7">
          {!isEdit ? "\t Contatos" : "Editar Contatos"}
        </Typography>

        <TextField
          disabled={!isEdit}
          size="small"
          
          inputProps={{ maxLength: 11 }}
          type="number"
          variant="outlined"
          margin="normal"
          fullWidth
          required={true}
          id="phone"
          label="Telefone Principal"
          name="phone"
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
          defaultValue={
            userContext.contacts.Phone_1 ? userContext.contacts.Phone_1 : null
          }
        />

        <TextField
          disabled={!isEdit}
          size="small"
          
          inputProps={{ maxLength: 11 }}
          type="number"
          variant="outlined"
          margin="normal"
          fullWidth
          id="twoPhone"
          label="Telefone Para Recado"
          name="twoPhone"
          onChange={(e) => {
            setTwoNumber(e.target.value);
          }}
          defaultValue={
            userContext.contacts.Phone_2 ? userContext.contacts.Phone_2 : null
          }
        />
      </Box>
      {!userContext.contacts.Phone_1 || isEdit ? (
        <Box display="flex" flexDirection="column" alignItems="flex-end">
          <Stack spacing={2} direction="row">
            <Button
              variant="text"
              color="primary"
              type="submit"
              onClick={() => {
                setIsEdit(false);
                props.setEdit(false);
              }}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={() => {
                onSubmit();
                props.setEdit(false);
              }}
            >
              Salvar
            </Button>
          </Stack>
        </Box>
      ) : (
        <Box display="flex" flexDirection="column" alignItems="flex-end">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={() => {
              setIsEdit(true);
            }}
          >
            Editar
          </Button>
        </Box>
      )}
    </>
  );
}
