import React from "react";
import Box from "@mui/material/Box";
import { TextField, Typography } from "@mui/material";
import { FromISODateHourTmzToDMY } from "../../Helpers/Formats";

export default function EditTestForm({ row, index }) {
  
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      sx={{
        "& .MuiTextField-root": { mb: 1.5 },
      }}
      noValidate
      autoComplete="off"
      key={`box.${row.FK_UserID}.${row.CreationDate}.${index}`}
    >
      <Typography sx={{mt: 1}} variant="h7">{index+1}º Teste Realizado</Typography>
      <TextField
        disabled
        variant="outlined"
        size="small"
        margin="normal"
        fullWidth
        id="datetimetest"
        key={`datetimetest.${row.FK_UserID}.${row.CreationDate}.${index}`}
        label="Data do Teste"
        defaultValue={row.CreationDate ? FromISODateHourTmzToDMY(row.CreationDate.toString()) : null}
      />

      <TextField
        disabled
        margin="normal"
        key={`testok.${row.FK_UserID}.${row.CreationDate}.${index}`}
        label="O que testou e funcionou?"
        placeholder="Descrição do teste"
        multiline
        fullWidth
        defaultValue={row.TestOK ? row.TestOK : null}
      />

      <TextField
        disabled
        margin="normal"
        key={`testnok.${row.FK_UserID}.${row.CreationDate}.${index}`}
        label="O que testou e não funcionou?"
        placeholder="O que deve ser corrigido"
        multiline
        fullWidth
        defaultValue={row.TestNOK ? row.TestNOK : null}
      />
      <TextField
        disabled
        margin="normal"
        key={row.NotTested ? row.NotTested : index}
        label="Funcionalidade não testada"
        placeholder="faltou ou não foi implementada"
        multiline
        fullWidth
        defaultValue={row.NotTested ? row.NotTested : null}
      />
      <TextField
        disabled
        margin="normal"
        key={`suggestion.${row.FK_UserID}.${row.CreationDate}.${index}`}
        label="Sugestão"
        placeholder="Descrição"
        multiline
        fullWidth
        defaultValue={row.Suggestion ? row.Suggestion : null}
      />
    </Box>
  );
}
