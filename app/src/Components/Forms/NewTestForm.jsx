import React, { useState, useEffect } from "react";
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

export default function NewTestForm(props) {
  const [, setAppContext] = useAppContext();
  const [authContext] = useAuthContext();
  const [userContext, setUserContext] = useUserContext();
  const [testOK, setTestOK] = useState("");
  const [testNOK, setTestNOK] = useState("");
  const [notTested, setNotTested] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [clear, setClear] = useState(false);

  const [name, setName] = useState(
    userContext.identification
      ? userContext.identification.Name
      : authContext.username
  );
  const currentdate = new Date();
  const datetime = `${currentdate.getDate()}/${
    currentdate.getMonth() + 1
  }/${currentdate.getFullYear()}`;

  const err = {
    response: {
      data: {
        detail: "A descrição do teste está vazia...",
      },
    },
  };

  useEffect(() => {
    setTestOK("");
    setTestNOK("");
    setNotTested("");
    setSuggestion("");
  }, [clear]);

  const onSubmit = () => {
    let data = {
      FK_UserID: authContext.userid,
      UserName: name,
      TestOK: testOK,
      TestNOK: testNOK,
      NotTested: notTested,
      Suggestion: suggestion,
      CreationDate: null,
    };

    if (!testOK) return ShowErrorSnackBar(err, setAppContext);
    setClear(true);

    api.post(
        apiRouts.ADD_NEW_TEST.replace("%user_id%", authContext.userid),
        data
      )
      .then((res) => {
        props.setIsLoading(true);
        setUserContext((prev) => ({
          ...prev,
          test: res.data.results,
        }));
        ShowSuccessSnackBar(res, setAppContext);
      })
      .catch((err) => {
        ShowErrorSnackBar(err, setAppContext);
      });
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        sx={{
          "& .MuiTextField-root": { mb: 1.5 },
        }}
        noValidate
        autoComplete="off"
        key={"new-test-form"}
      >
        <Typography variant="h6">Realizar Teste</Typography>

        <TextField
          disabled
          variant="outlined"
          size="small"
          margin="normal"
          fullWidth
          id="new-test-form-usernameID"
          label="User Name"
          name="username"
          defaultValue={authContext.username}
        />

        <TextField
          fullWidth
          required
          variant="outlined"
          size="small"
          margin="normal"
          id="new-test-form-nameID"
          label="Nome"
          name="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          defaultValue={name ? name : null}
        />

        <TextField
          disabled
          variant="outlined"
          size="small"
          margin="normal"
          fullWidth
          id="new-test-form-datetimetest"
          label="Data do Teste"
          defaultValue={datetime}
        />

        <TextField
          rows={3}
          value={testOK}
          required
          margin="normal"
          id="new-test-form-outlined-textarea-testok"
          label="O que testou e funcionou?"
          placeholder="Descrição do teste"
          multiline
          fullWidth
          onChange={(e) => {
            setTestOK(e.target.value);
          }}
        />

        <TextField
          rows={3}
          value={testNOK}
          margin="normal"
          id="new-test-form-outlined-textarea-testnok"
          label="O que testou e não funcionou?"
          placeholder="O que deve ser corrigido"
          multiline
          fullWidth
          onChange={(e) => {
            setTestNOK(e.target.value);
          }}
        />
        <TextField
          rows={3}
          value={notTested}
          margin="normal"
          id="new-test-form-outlined-textarea-testnotTested"
          label="Funcionalidade não testada"
          placeholder="faltou ou não foi implementada"
          multiline
          fullWidth
          onChange={(e) => {
            setNotTested(e.target.value);
          }}
        />
        <TextField
          rows={3}
          value={suggestion}
          margin="normal"
          id="new-test-form-outlined-textarea-suggestion"
          label="Sugestão"
          placeholder="Descrição"
          multiline
          fullWidth
          onChange={(e) => {
            setSuggestion(e.target.value);
          }}
        />
      </Box>

      <Box display="flex" flexDirection="column" alignItems="flex-end">
        <Button
          sx={{ mt: "0.8rem", mb: "1rem" }}
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
