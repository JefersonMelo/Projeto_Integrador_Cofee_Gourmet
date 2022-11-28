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

export default function EditIdentificationForm() {
  const [, setAppContext] = useAppContext();
  const [authContext] = useAuthContext();
  const [userContext, setUserContext] = useUserContext();
  const [isEdit, setIsEdit] = useState(false);
  const [docNumber, setDocNumber] = useState(
    userContext.identification.DocNumber
  );
  const [lastName, setLastName] = useState(userContext.identification.LastName);
  const [name, setName] = useState(userContext.identification.Name);

  const onSubmit = () => {
    let data = {
      FK_UserID: authContext.userid,
      DocNumber: docNumber,
      LastName: lastName,
      Name: name,
      Modified: null,
      ModifiedBy: authContext.username,
    };

    if (!docNumber || !lastName) return;

    setIsEdit(false);

    api.put(
        apiRouts.EDIT_IDENTIFICATION_BY_USER_ID.replace(
          "%user_id%",
          authContext.userid
        ),
        data
      )
      .then((res) => {
        setUserContext((prev) => ({
          ...prev,
          identification: res.data.results,
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
          {!isEdit ? "\t Identificação" : "Editar Identificação"}
        </Typography>

        <TextField
          fullWidth
          required
          
          disabled={!isEdit}
          variant="outlined"
          size="small"
          margin="normal"
          id="nameID"
          label="Nome"
          name="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          defaultValue={
            userContext.identification.Name
              ? userContext.identification.Name
              : null
          }
        />

        <TextField
          fullWidth
          required
          
          disabled={!isEdit}
          variant="outlined"
          size="small"
          margin="normal"
          id="sobrenomeID"
          label="Sobrenome"
          name="lastname"
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          defaultValue={
            userContext.identification.LastName
              ? userContext.identification.LastName
              : null
          }
        />

        <TextField
          fullWidth
          required
          
          inputProps={{ maxLength: 11 }}
          placeholder="000 000 000 00"
          disabled={!isEdit}
          variant="outlined"
          size="small"
          margin="normal"
          id="docNumberID"
          label="CPF"
          name="number"
          onChange={(e) => {
            setDocNumber(e.target.value);
          }}
          defaultValue={
            userContext.identification.DocNumber
              ? userContext.identification.DocNumber
              : null
          }
          onInput={(e) => {
            e.target.value = Math.max(0, parseInt(e.target.value))
              .toString()
              .slice(0, 11);
          }}
          
        />
      </Box>
      {!userContext.identification.DocNumber || isEdit ? (
        <Box display="flex" flexDirection="column" alignItems="flex-end">
          <Stack spacing={2} direction="row">
            <Button
              variant="text"
              color="primary"
              type="submit"
              onClick={() => {
                setIsEdit(false);
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
