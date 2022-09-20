import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Avatar, TextField } from "@mui/material";
import { useAppContext } from "../../Contexts/AppContext";
import { useUserContext } from "../../Contexts/UserContext";
import api from "../../Services/api";
import { apiRouts } from "../../Helpers/Globals";
import { validatorEmail } from "../../Helpers/Validators";
import {
  ShowErrorSnackBar,
  ShowSuccessSnackBar,
} from "../../Helpers/SnackBars";

export default function RegistrationForm() {
  const [appContext, setAppContext] = useAppContext();
  const [userContext, setUserContext] = useUserContext();
  const navigate = useNavigate();
  console.log(userContext.email);
  const onSubmit = () => {
    let data = {
      email: userContext.email,
      password: userContext.password,
    };

    api.post(apiRouts.CREATE_USER, data)
      .then((res) => {
        console.debug(res);
        ShowSuccessSnackBar(res, appContext, setAppContext);
        navigate("/home");
      })
      .catch((err) => {
        ShowErrorSnackBar(err, appContext, setAppContext);
      });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      m={24}
      mt={16}
      // component="form"
    >
      <Avatar></Avatar>
      <Typography variant="h5">Cadastro</Typography>

      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        required={true}
        id="email"
        label="E-mail"
        name="email"
        autoComplete="email"
        autoFocus
        onChange={(event) => {
          setUserContext((userContext) => ({
            ...userContext,
            email: event.target.value,
          }));
        }}
      />

      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        required={true}
        name="password"
        label="Senha"
        type="password"
        id="password"
        autoComplete="current-password"
        onChange={(event) => {
          setUserContext((userContext) => ({
            ...userContext,
            password: event.target.value,
          }));
        }}
      />

      <Button
        disabled={!validatorEmail(appContext.email)}
        variant="contained"
        color="primary"
        type="submit"
        fullWidth
        onClick={() => {
          onSubmit();
        }}
      >
        Entrar
      </Button>
    </Box>
  );
}
