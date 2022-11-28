import React, { useState } from "react";
import {
  Box,
  Button,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { array_month, array_year } from "../../Helpers/MockDayMonthYear";
import { flag_card } from "../../Helpers/MockFlagCard";
import { useUserContext } from "../../Contexts/UserContext";
import api from "../../Services/api";
import { useAppContext } from "../../Contexts/AppContext";
import { useAuthContext } from "../../Contexts/AuthenticationContext";
import {
  ShowErrorSnackBar,
  ShowSuccessSnackBar,
} from "../../Helpers/SnackBars";
import { apiRouts } from "../../Helpers/Globals";

export default function NewCreditCardForm() {
  const [, setAppContext] = useAppContext();
  const [authContext] = useAuthContext();
  const [, setUserContext] = useUserContext();
  const [cardNumber, setCardNumber] = useState(0);
  const [userCardName, setUserCardName] = useState("");
  const [cardFlag, setCardFlag] = useState("");
  const [numberCPF, setNumberCPF] = useState("");
  const [cvc, setCVC] = useState("");
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);

  const onSubmit = () => {
    let data = {
      FK_UserID: authContext.userid,
      CardNumber: cardNumber,
      UserDocNumber: numberCPF,
      CardFlag: cardFlag,
      UserName: userCardName,
      Validity: `${month < 10 ? `0${month}` : month}/${year}`,
      CVC: cvc,
    };

    if (
      !cardNumber ||
      !numberCPF ||
      !cardFlag ||
      !userCardName ||
      !cvc ||
      !(month && year)
    )
      return;

    api.post(
        apiRouts.ADD_CREDITCARD_BY_USER_ID.replace(
          "%user_id%",
          authContext.userid
        ),
        data
      )
      .then((res) => {
        setUserContext((prev) => ({
          ...prev,
          creditcard: res.data.results,
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
        <Typography variant="h7">{"4 \t Detalhes do Cartão"}</Typography>
      </Box>
      <Box>
        <TextField
          size="small"
          inputProps={{ maxLength: 16 }}
          
          variant="outlined"
          margin="normal"
          fullWidth
          required
          placeholder="1111 2222 3333 4444"
          id="cardnumberid"
          key="cardnumberkey"
          label="Número do Cartão"
          name="cardnumber"
          type="number"
          onInput={(e) => {
            e.target.value = Math.max(0, parseInt(e.target.value))
              .toString()
              .slice(0, 16);
          }}
          onChange={(e) => setCardNumber(e.target.value)}
        />

        <TextField
          size="small"
          
          variant="outlined"
          margin="normal"
          fullWidth
          required
          placeholder="Seu Nome Como Está No Cartão"
          id="namecardid"
          key="namecardkey"
          label="Nome No Cartão"
          name="namecard"
          onChange={(e) => setUserCardName(e.target.value)}
        />

        <TextField
          fullWidth
          placeholder="000 000 000 00"
          required
          size="small"
          inputProps={{ maxLength: 11 }}
          
          variant="outlined"
          margin="normal"
          id="docNumberID"
          label="CPF do Titular"
          type="number"
          onInput={(e) => {
            e.target.value = Math.max(0, parseInt(e.target.value))
              .toString()
              .slice(0, 11);
          }}
          onChange={(e) => setNumberCPF(e.target.value)}
        />

        <Box sx={{ mt: 2 }} key={"form-control-card-date"}>
          <FormLabel component="legend" sx={{ fontSize: 19 }}>
            Validade
          </FormLabel>
          <FormControl
            sx={{ mt: 1, mr: 1, mb: 3, minWidth: 160 }}
            size="small"
            variante="standard"
            required
          >
            <InputLabel id="month-simple-select-readonly-label">Mês</InputLabel>
            <Select
              labelId="month-simple-select-readonly-label"
              id="month-simple-select-readonly"
              label="Mês"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              {array_month?.map((date, i) => (
                <MenuItem key={`month.${date}.${i}`} value={date}>
                  {date < 10 ? `0${date}` : date}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            sx={{ mt: 1, mr: 1, mb: 3, minWidth: 160 }}
            size="small"
            required
          >
            <InputLabel id="a-simple-select-readonly-label">Ano</InputLabel>
            <Select
              labelId="a-simple-select-readonly-label"
              id="a-simple-select-readonly"
              label="Ano"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              {array_year.map((date, i) => (
                <MenuItem key={`year.${date}.${i}`} value={date}>
                  {date}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            sx={{ mt: 1, mr: 1, mb: 3, minWidth: 160 }}
            size="small"
            required
          >
            <InputLabel id="a-simple-select-readonly-label">
              Bandeira
            </InputLabel>
            <Select
              labelId="a-simple-select-readonly-label"
              id="a-simple-select-readonly"
              label="Bandeira"
              value={cardFlag}
              onChange={(e) => setCardFlag(e.target.value)}
            >
              {flag_card.map((flag, i) => (
                <MenuItem key={`flag_card.${flag}.${i}`} value={flag}>
                  {flag}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" required sx={{ mt: 1, minWidth: 160 }}>
            <TextField
              type="text"
              placeholder="000"
              required
              size="small"
              inputProps={{ maxLength: 3 }}
              variant="outlined"
              id="cvcID"
              label="CVC"
              onChange={(e) => setCVC(e.target.value)}
            />
          </FormControl>
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
      </Box>
    </>
  );
}
