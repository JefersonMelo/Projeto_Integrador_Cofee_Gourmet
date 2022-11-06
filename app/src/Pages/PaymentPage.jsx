import React, { useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { Main } from "./Config/MainStyle";
import { Typography } from "@mui/material";
import { useAppContext } from "../Contexts/AppContext";
import EditContactForm from "../Components/Forms/EditContactForm";
import EditAddressForm from "../Components/Forms/EditAddressForm";
import { useUserContext } from "../Contexts/UserContext";
import { useAuthContext } from "../Contexts/AuthenticationContext";
import { ShowErrorSnackBar } from "../Helpers/SnackBars";
import api from "../Services/api";
import { apiRouts } from "../Helpers/Globals";

export default function PaymentPage() {
  const [appContext, setAppContext] = useAppContext();
  const [userContext, setUserContext] = useUserContext();
  const [authContext] = useAuthContext();

  useEffect(() => {
    /*IDENTIFICATION*/
    let routeIdentification = api.get(
      apiRouts.GET_IDENTIFICATION_BY_USER_ID.replace(
        "%user_id%",
        authContext.userid
      )
    );

    /*ADDRESS*/
    let routeAddress = api.get(
      apiRouts.GET_ADDRESS_BY_USER_ID.replace("%user_id%", authContext.userid)
    );

    /*CONTACTS*/
    let routeContacts = api.get(
      apiRouts.GET_CONTACTS_BY_USER_ID.replace("%user_id%", authContext.userid)
    );

    axios.all([routeIdentification, routeAddress, routeContacts])
      .then(
        axios.spread((res1, res2, res3) => {
          /*IDENTIFICATION*/
          if (res1.data.results) {
            setUserContext((prev) => ({
              ...prev,
              identification: res1.data.results,
            }));
          }

          /*ADDRESS*/
          if (res2.data.results) {
            setUserContext((prev) => ({
              ...prev,
              address: res2.data.results,
            }));
          }

          /*CONTACTS*/
          if (res3.data.results) {
            setUserContext((prev) => ({
              ...prev,
              contacts: res3.data.results,
            }));
          }
        })
      )
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
          <Typography variant="h6">PÁGINA DE PAGAMENTOS</Typography>
        </Box>
        {userContext.contacts ? <EditContactForm /> : null}
        {userContext.identificarion ? <EditContactForm /> : null}
        {userContext.address ? <EditAddressForm /> : null}
      </Main>
    </Box>
  );
}
