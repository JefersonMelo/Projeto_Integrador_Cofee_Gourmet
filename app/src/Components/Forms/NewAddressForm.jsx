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

export default function NewAddressForm() {
  const [, setAppContext] = useAppContext();
  const [authContext, ] = useAuthContext();
  const [, setUserContext]= useUserContext();
  const [addressName, setAddressName] = useState("");
  const [addressNumber, setAddressNumber] = useState(0);
  const [complement, setComplement] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");

  const onSubmit = () => {
    let data = {
      FK_UserID: authContext.userid,
      AddressName: addressName,
      AddressNumber: addressNumber,
      Complement: complement,
      ZipCode: zipCode,
      District: district,
      City: city,
    };

    if (!addressName || !addressNumber || !zipCode || !district || !city)
      return;

    data.AddressNumber = parseInt(addressNumber);

    api.post(
        apiRouts.ADD_NEW_ADDRESS_BY_USER_ID.replace(
          "%user_id%",
          authContext.userid
        ),
        data
      )
      .then((res) => {
        setUserContext((prev) => ({
          ...prev,
          address: res.data.results,
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
        <Typography variant="h6">Adicionar Endereço</Typography>

        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          required
          id="nameAddress"
          label="Nome da Rua"
          name="nameAddress"
          onChange={(e) => {
            setAddressName(e.target.value);
          }}
        />

        <TextField
          type="number"
          variant="outlined"
          margin="normal"
          fullWidth
          required
          id="addessNumber"
          label="Número"
          name="number"
          onChange={(e) => {
            setAddressNumber(e.target.value);
          }}
        />

        <TextField
          type="number"
          variant="outlined"
          margin="normal"
          fullWidth
          required
          name="zipCode"
          label="CEP"
          id="zipCode"
          inputProps={{ maxLength: 7 }}
          onChange={(e) => {
            setZipCode(e.target.value);
          }}
        />

        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="complement"
          label="Complemento"
          id="complement"
          onChange={(e) => {
            setComplement(e.target.value);
          }}
        />

        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          required
          name="district"
          label="Bairro"
          id="district"
          onChange={(e) => {
            setDistrict(e.target.value);
          }}
        />

        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          required
          name="city"
          label="Cidade"
          id="city"
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />

        <TextField
          disabled
          variant="outlined"
          margin="normal"
          fullWidth
          name="country"
          label="País"
          id="country"
          defaultValue="Brasil"
        />

        <TextField
          disabled
          variant="outlined"
          margin="normal"
          fullWidth
          name="planet"
          label="Planeta"
          id="planet"
          defaultValue="Terra"
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
