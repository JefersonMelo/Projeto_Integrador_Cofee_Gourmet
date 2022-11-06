import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { Main } from "../Pages/Config/MainStyle";
import { useAppContext } from "../Contexts/AppContext";
import NewAddressForm from "../Components/Forms/NewAddressForm";
import NewContactForm from "../Components/Forms/NewContactForm";
import { useUserContext } from "../Contexts/UserContext";
import NewIdentificationForm from "../Components/Forms/NewIdentificationForm";
import { Button, Divider, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function UserInfosPage() {
  const [appContext] = useAppContext();
  const [userContext] = useUserContext();
  const navigate = useNavigate();

  useEffect(()=>{
      if(userContext.identification && userContext.address && userContext.contacts){
        navigate("/payment")
      }
      
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userContext])

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
            <NewIdentificationForm />
            <Divider />
          </Box>
        ) : null}

        {!userContext.address ? (
          <Box sx={{ mt: 5, mb: 7 }}>
            <NewAddressForm />
            <Divider />
          </Box>
        ) : null}

        {!userContext.contacts ? (
          <Box sx={{ mt: 5 }}>
            <NewContactForm />
          </Box>
        ) : null}
      </Main>
    </Box>
  );
}
