import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
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

export default function EditCreditCardForm(props) {
  const [, setAppContext] = useAppContext();
  const [authContext] = useAuthContext();
  const [userContext, setUserContext] = useUserContext();
  const [cardNumber, setCardNumber] = useState(
    userContext.creditcard.CardNumber
  );
  const [userCardName, setUserCardName] = useState(
    userContext.creditcard.UserName
  );
  const [cardFlag, setCardFlag] = useState(userContext.creditcard.CardFlag);
  const [numberCPF, setNumberCPF] = useState(
    userContext.creditcard.UserDocNumber
  );
  const [cvc, setCVC] = useState(userContext.creditcard.CVC);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (userContext.creditcard.Validity) {
      let month_year = userContext.creditcard?.Validity?.split("/");
      setMonth(month_year[0][1]);
      setYear(month_year[1]);
    }
  }, [userContext.creditcard.Validity, userContext.creditcard.CardNumber]);

  const onSubmit = () => {
    let data = {
      CardID: userContext.creditcard.CardID,
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
    setIsEdit(false);

    api.put(
        apiRouts.EDIT_CREDITCARD_BY_USER_ID.replace(
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
        setIsEdit(true);
        ShowErrorSnackBar(err, setAppContext);
      });
  };

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="flex-start">
        <Typography variant="h7">
          {!isEdit ? "\t Dados do Cartão" : "Editar Cartão"}
        </Typography>
      </Box>
      <Box>
        <TextField
          size="small"
          disabled={!isEdit}
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
          defaultValue={
            userContext.creditcard.CardNumber
              ? userContext.creditcard.CardNumber
              : null
          }
        />

        <TextField
          size="small"
          disabled={!isEdit}
          
          variant="outlined"
          margin="normal"
          fullWidth
          required
          placeholder="O Nome Como Está No Cartão"
          id="namecardid"
          key="namecardkey"
          label="Nome No Cartão"
          name="namecard"
          onChange={(e) => setUserCardName(e.target.value)}
          defaultValue={
            userContext.creditcard.UserName
              ? userContext.creditcard.UserName
              : null
          }
        />

        <TextField
          fullWidth
          disabled={!isEdit}
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
          defaultValue={
            userContext.creditcard.UserDocNumber
              ? userContext.creditcard.UserDocNumber
              : null
          }
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
            disabled={!isEdit}
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
            disabled={!isEdit}
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
            disabled={!isEdit}
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
          <FormControl
            disabled={!isEdit}
            size="small"
            required
            sx={{ mt: 1, minWidth: 160 }}
          >
            <TextField
              type="text"
              disabled={!isEdit}
              placeholder="000"
              required
              size="small"
              inputProps={{ maxLength: 3 }}
              variant="outlined"
              id="cvcID"
              label="CVC"
              onChange={(e) => setCVC(e.target.value)}
              defaultValue={
                userContext.creditcard.CVC ? userContext.creditcard.CVC : null
              }
            />
          </FormControl>
        </Box>
        {!userContext.creditcard.CardNumber || isEdit ? (
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
      </Box>
    </>
  );
}
