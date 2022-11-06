import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Chip, FormHelperText, TextField } from "@mui/material";
import { useAppContext } from "../../Contexts/AppContext";
import { useAuthContext } from "../../Contexts/AuthenticationContext";
import api from "../../Services/api";
import { apiRouts } from "../../Helpers/Globals";
import { validatorEmail } from "../../Helpers/Validators";
import {
  ShowErrorSnackBar,
  ShowSuccessSnackBar,
} from "../../Helpers/SnackBars";

export default function RegistrationForm() {
  const [, setAppContext] = useAppContext();
  const [, setAuthContext] = useAuthContext();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkedPassword, setcheckedPassword] = useState(true);
  const navigate = useNavigate();

  const pw = (password) => {
    if (!password) {
      setcheckedPassword(false);
    } else {
      setcheckedPassword(true);
    }
  };
  const onSubmit = () => {
    if (!password || !email || !userName) {
      return;
    }

    let data = {
      UserName: userName,
      UserEmail: email,
      Password: password,
    };

    api.post(apiRouts.CREATE_USER, data)
      .then((res) => {
        setAuthContext((prev) => ({
          ...prev,
          userid: res.data.id,
          token: res.data.token,
          username: res.data.username,
        }));
        navigate("/home");
        ShowSuccessSnackBar(res, setAppContext);
      })
      .catch((err) => {
        ShowErrorSnackBar(err, setAppContext);
      });
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <strong>
        <Chip label="Cadastre-se cbgourmet" />
      </strong>      
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        required={true}
        id="name"
        label="Nome"
        name="name"
        autoFocus
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      />

      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        required={true}
        id="email"
        label="E-mail"
        name="email"
        autoComplete="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />

      <TextField
        variant="outlined"
        onKeyPress={(e) =>{if(e.key === "Enter"){onSubmit();}}}
        margin="normal"
        fullWidth
        required={true}
        name="password"
        label="Senha"
        type="password"
        id="password"
        autoComplete="current-password"
        onChange={(e) => {
          setPassword(e.target.value);
          pw(e.target.value);
        }}
      />
      {!checkedPassword && (
        <>
          <Box
            sx={{
              justifyContent: "flex-end",
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <FormHelperText error={!checkedPassword} sx={{ mt: "0.5rem" }}>
              Digite uma Senha 🙄
            </FormHelperText>
          </Box>
        </>
      )}

      <Button
        sx={{ mt: "0.8rem", mb: "1rem" }}
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
