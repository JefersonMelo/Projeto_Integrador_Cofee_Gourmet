import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, Stack, TextField } from "@mui/material";
import { useAppContext } from "../../Contexts/AppContext";
import { useAuthContext } from "../../Contexts/AuthenticationContext";
import api from "../../Services/api";
import { apiRouts } from "../../Helpers/Globals";
import {
  ShowErrorSnackBar,
  ShowSuccessSnackBar,
} from "../../Helpers/SnackBars";
import { useUserContext } from "../../Contexts/UserContext";

export default function EditAddressForm(props) {
  const [, setAppContext] = useAppContext();
  const [authContext] = useAuthContext();
  const [userContext, setUserContext] = useUserContext();
  const [addressName, setAddressName] = useState(
    userContext.address.AddressName
  );
  const [addressNumber, setAddressNumber] = useState(
    userContext.address.AddressNumber
  );
  const [complement, setComplement] = useState(userContext.address.Complement);
  const [zipCode, setZipCode] = useState(userContext.address.ZipCode);
  const [district, setDistrict] = useState(userContext.address.District);
  const [city, setCity] = useState(userContext.address.City);
  const [planet, setPlanet] = useState(userContext.address.Planet);
  const [country, setCountry] = useState(userContext.address.Country);
  const [state, setState] = useState(userContext.address.State);
  const [isEdit, setIsEdit] = useState(false);

  const onSubmit = () => {
    let data = {
      FK_UserID: authContext.userid,
      AddressName: addressName,
      AddressNumber: addressNumber,
      Complement: complement,
      ZipCode: zipCode,
      District: district,
      City: city,
      State: state,
      Modified: null,
      ModifiedBy: authContext.username,
      Planet: planet,
      Country: country,
    };

    if (
      !addressName ||
      !addressNumber ||
      !zipCode ||
      !district ||
      !city ||
      !state
    )
      return;

    data.AddressNumber = parseInt(addressNumber);
    setIsEdit(false);

    api.put(
        apiRouts.EDIT_ADDRESS_BY_USER_ID.replace(
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
        setIsEdit(true);
        ShowErrorSnackBar(err, setAppContext);
      });
  };

  return (
    <>
      <Box
        sx={{ minWidth: 160 }}
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
      >
        <Typography variant="h7">
          {!isEdit ? "\t Endereço" : "Editar Endereço"}
        </Typography>

        <TextField
          disabled={!isEdit}
          size="small"
          
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
          defaultValue={
            userContext.address.AddressName
              ? userContext.address.AddressName
              : null
          }
        />

        <TextField
          disabled={!isEdit}
          size="small"
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
          defaultValue={
            userContext.address.AddressNumber
              ? userContext.address.AddressNumber
              : null
          }
        />

        <TextField
          disabled={!isEdit}
          size="small"
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
          defaultValue={
            userContext.address.ZipCode ? userContext.address.ZipCode : null
          }
        />

        <TextField
          disabled={!isEdit}
          size="small"
          
          variant="outlined"
          margin="normal"
          fullWidth
          name="complement"
          label="Complemento"
          id="complement"
          onChange={(e) => {
            setComplement(e.target.value);
          }}
          defaultValue={
            userContext.address.Complement
              ? userContext.address.Complement
              : null
          }
        />

        <TextField
          disabled={!isEdit}
          size="small"
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
          defaultValue={
            userContext.address.District ? userContext.address.District : null
          }
        />

        <TextField
          disabled={!isEdit}
          size="small"
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
          defaultValue={
            userContext.address.City ? userContext.address.City : null
          }
        />

        <TextField
          variant="outlined"
          disabled={!isEdit}
          size="small"
          margin="normal"
          
          fullWidth
          required
          name="state"
          label="Estado"
          id="state"
          onChange={(e) => {
            setState(e.target.value);
          }}
          defaultValue={
            userContext.address.State ? userContext.address.State : null
          }
        />

        <TextField
          inputProps={{ maxLength: 2 }}
          disabled={!isEdit}
          size="small"
          variant="outlined"
          
          margin="normal"
          fullWidth
          name="country"
          label="País"
          id="country"
          onChange={(e) => {
            setCountry(e.target.value);
          }}
          defaultValue={
            userContext.address.Country ? userContext.address.Country : null
          }
        />

        <TextField
          disabled={!isEdit}
          size="small"
          variant="outlined"
          margin="normal"
          
          fullWidth
          name="planet"
          label="Planeta"
          id="planet"
          onChange={(e) => {
            setPlanet(e.target.value);
          }}
          defaultValue={
            userContext.address.Planet ? userContext.address.Planet : null
          }
        />
      </Box>

      {!userContext.address.AddressName || isEdit ? (
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
    </>
  );
}
