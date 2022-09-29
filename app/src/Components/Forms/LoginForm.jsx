import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Avatar, TextField } from "@mui/material";
import { FormHelperText } from "@mui/material";
import { useAppContext } from "../../Contexts/AppContext";
import { useUserContext } from "../../Contexts/UserContext";
import api from "../../Services/api";
import { apiRouts } from "../../Helpers/Globals";
import { validatorEmail } from "../../Helpers/Validators";  
import { ShowSuccessSnackBar } from "../../Helpers/SnackBars";
import { Theme } from "../../Helpers/Theme";

export default function RegistrationForm() {
  const [appContext, setAppContext] = useAppContext();
  const [userContext, setUserContext] = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkedUser, setCheckedUser] = useState(false);
  const navigate = useNavigate();
  const colors = Theme.palette;

  const onSubmit = () => {
    const data = {
      email: email,
      password: password,
    };

    api.post(apiRouts.GET_LOGIN, data)
      .then((res) => {
        ShowSuccessSnackBar(res, appContext, setAppContext);
        setUserContext(() => ({
          ...userContext,
          userid: res.data.userid,
          username: res.data.username,
          token: res.data.token,
        }));
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        setCheckedUser(true);
      });
  };

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar></Avatar>
        <Typography variant="h5">Login</Typography>
        <TextField
          error={checkedUser}
          variant="outlined"
          margin="normal"
          fullWidth
          required={true}
          id="email"
          label="E-mail"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={(e) => {
            setEmail(e.target.value);
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
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button
          sx={{ mt: "0.8rem" }}
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
      {checkedUser && (
        <>
          <Box
            sx={{
              justifyContent: "flex-end",
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <FormHelperText sx={{ mt: "0.5rem" }}>
              Não tem cadastro?
            </FormHelperText>
          </Box>
        </>
      )}
      <Box
        sx={{
          mt: "0.5rem",
          justifyContent: "flex-end",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <Button
          sx={{
            "&:hover, &.Mui-focusVisible": {
              backgroundColor: colors.dropzone.lighGrey,
            },
          }}
          color="primary"
          onClick={() => {
            navigate("/new/user");
          }}
        >
          Cadastre-se
        </Button>
      </Box>
    </>
  );
}
