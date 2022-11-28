import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, TextField } from "@mui/material";
import { useAppContext } from "../../Contexts/AppContext";
import { useAuthContext } from "../../Contexts/AuthenticationContext";
import api from "../../Services/api";
import { apiRouts } from "../../Helpers/Globals";
import {
  ShowErrorSnackBar,
  ShowSuccessSnackBar,
} from "../../Helpers/SnackBars";
import { useUserContext } from "../../Contexts/UserContext";

export default function NewContactForm() {
  const [, setAppContext] = useAppContext();
  const [authContext] = useAuthContext();
  const [, setUserContext] = useUserContext();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [towNumber, setTwoNumber] = useState("");

  const onSubmit = () => {
    let data = {
      FK_UserID: authContext.userid,
      Phone_1: phoneNumber,
      Phone_2: towNumber,
    };

    if (!phoneNumber) return;

    api.post(
        apiRouts.ADD_NEW_CONTACTS_BY_USER_ID.replace(
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
        ShowErrorSnackBar(err, setAppContext);
      });
  };

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="flex-start">
        <Typography variant="h6">Adicionar Contatos</Typography>

        <TextField
          type="number"
          
          variant="outlined"
          size="small"
          margin="normal"
          fullWidth
          required={true}
          id="phone"
          label="Telefone Principal"
          name="phone"
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        />

        <TextField
          type="number"
          
          variant="outlined"
          size="small"
          margin="normal"
          fullWidth
          id="twoPhone"
          label="Telefone Para Recado"
          name="twoPhone"
          onChange={(e) => {
            setTwoNumber(e.target.value);
          }}
        />
      </Box>

      <Box display="flex" flexDirection="column" alignItems="flex-end">
        <Button
          sx={{ mt: "0.8rem", mb: "1rem" }}
          // disabled={isDisable}
          variant="contained"
          color="primary"
          type="submit"
          onClick={() => {
            onSubmit();
          }}
        >
          Salvar
        </Button>
      </Box>
    </>
  );
}
