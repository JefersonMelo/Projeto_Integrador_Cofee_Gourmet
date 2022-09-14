import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Avatar, TextField } from "@mui/material";
import { useAppContext } from "../../Contexts/AppContext";
import api from "../../Services/api";
import { apiRouts } from "../../Helpers/Globals";
import { validatorEmail } from "../../Helpers/Validators";
import { login } from "../../Services/auth";
import {
  ShowErrorSnackBar,
  ShowSuccessSnackBar,
} from "../../Helpers/SnackBars";

export default function RegistrationForm() {
  const [appContext, setAppContext] = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = () => {
    const data = {
      email: email,
      password: password,
    };

    api.post(apiRouts.GET_LOGIN, data)
      .then((res) => {
        ShowSuccessSnackBar(res, appContext, setAppContext);
        login(res.data.token);
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
    >
      <Avatar></Avatar>
      <Typography variant="h5">Login</Typography>

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
        onChange={(e) => {setEmail(e.target.value)}}
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
        onChange={(e) => {setPassword(e.target.value)}}
      />

      <Button
        disabled={!validatorEmail(email)}
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
