import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { Main } from "./Config/MainStyle";
import { Button, Typography } from "@mui/material";
import { useAppContext } from "../Contexts/AppContext";
import { useUserContext } from "../Contexts/UserContext";
import EditIdentificationForm from "../Components/Forms/EditIdentificationForm";
import EditContactForm from "../Components/Forms/EditContactForm";
import EditAddressForm from "../Components/Forms/EditAddressForm";
import NewIdentificationForm from "../Components/Forms/NewIdentificationForm";
import NewAddressForm from "../Components/Forms/NewAddressForm";
import NewContactForm from "../Components/Forms/NewContactForm";
import NewCreditCardForm from "../Components/Forms/NewCreditCardForm";
import EditCreditCardForm from "../Components/Forms/EditCreditCardForm";
import { useAuthContext } from "../Contexts/AuthenticationContext";
import api from "../Services/api";
import { apiRouts } from "../Helpers/Globals";
import { ShowErrorSnackBar } from "../Helpers/SnackBars";
import BorderBox from "../Components/Boxes/BorderBox";

export default function PageUserConfig() {
  const [appContext, setAppContext] = useAppContext();
  const [userContext, setUserContext] = useUserContext();
  const [authContext] = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    api.get(apiRouts.GET_USER_ALL_INFO_BY_USER_ID.replace("%user_id%", authContext.userid))
    .then((res) =>{
      setUserContext((prev) => ({
        ...prev,
        identification: res.data.results.Identification,
        address: res.data.results.Address,
        contacts: res.data.results.Contacts,
        creditcard: res.data.results.CreditCard,
      }));
    })
    .catch((err) => ShowErrorSnackBar(err, setAppContext));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ mt: 2, flexGrow: 12 }}>
      <Main open={appContext.drawerOpened} context={appContext}>
        <Box
          sx={{
            mt: 7,
            mb: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Informações Cadastradas</Typography>
        </Box>
        {userContext.identification ? (
          <BorderBox Element={EditIdentificationForm} />
        ) : (
          <BorderBox Element={NewIdentificationForm} />
        )}
        {userContext.contacts ? <BorderBox Element={EditContactForm} /> : <BorderBox Element={NewContactForm} />}
        {userContext.address ? <BorderBox Element={EditAddressForm} /> : <BorderBox Element={NewAddressForm} />}
        {userContext.creditcard ? (
          <BorderBox Element={EditCreditCardForm} />
        ) : (
          <BorderBox Element={NewCreditCardForm} />
        )}

        <Box sx={{ mt: 5 }}>
          <Box>
            <Button
              sx={{ mt: "20px", width: "100%" }}
              variant="contained"
              onClick={() => navigate("/home")}
            >
              Voltar Para Início
            </Button>
          </Box>
        </Box>
      </Main>
    </Box>
  );
}
