import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { Button, Divider, Stack } from "@mui/material";
import { Main } from "../Pages/Config/MainStyle";
import { useAppContext } from "../Contexts/AppContext";
import NewAddressForm from "../Components/Forms/NewAddressForm";
import NewContactForm from "../Components/Forms/NewContactForm";
import { useUserContext } from "../Contexts/UserContext";
import NewIdentificationForm from "../Components/Forms/NewIdentificationForm";
import NewCreditCardForm from "../Components/Forms/NewCreditCardForm";
import api from "../Services/api";
import { useAuthContext } from "../Contexts/AuthenticationContext";
import { apiRouts } from "../Helpers/Globals";
import { ShowErrorSnackBar } from "../Helpers/SnackBars";
import BorderBox from "../Components/Boxes/BorderBox";

export default function UserInfosPage() {
  const [appContext, setAppContext] = useAppContext();
  const [userContext, setUserContext] = useUserContext();
  const [authContext] = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    api.get(
        apiRouts.GET_USER_ALL_INFO_BY_USER_ID.replace(
          "%user_id%",
          authContext.userid
        )
      )
      .then((res) => {
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

  useEffect(() => {
    if (
      userContext.identification &&
      userContext.address &&
      userContext.contacts &&
      userContext.creditcard
    ) {
      navigate("/payment");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userContext]);

  return (
    <Box sx={{ mt: 11, flexGrow: 12 }}>
      <Main open={appContext.drawerOpened} context={appContext}>
        <Stack spacing={2} direction="row">
          <Button
            onClick={() => {
              navigate("/home");
            }}
            variant="text"
          >
            Preencher Depois
          </Button>
        </Stack>
        {!userContext.identification ? (
          <Box sx={{ mt: 5, mb: 7 }}>
            <BorderBox Element={NewIdentificationForm} />
            <Divider />
          </Box>
        ) : null}

        {!userContext.address ? (
          <Box sx={{ mt: 5, mb: 7 }}>
            <BorderBox Element={NewAddressForm} />
            <Divider />
          </Box>
        ) : null}

        {!userContext.contacts ? (
          <Box sx={{ mt: 5 }}>
            <BorderBox Element={NewContactForm} />
          </Box>
        ) : null}

        {!userContext.creditcard ? (
          <Box sx={{ mt: 5 }}>
            <BorderBox Element={NewCreditCardForm} />
          </Box>
        ) : null}
      </Main>
    </Box>
  );
}
