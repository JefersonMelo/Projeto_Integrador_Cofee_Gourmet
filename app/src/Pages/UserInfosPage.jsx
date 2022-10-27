import * as React from "react";
import Box from "@mui/material/Box";
import { Main } from "../Pages/Config/MainStyle";
import { useAppContext } from "../Contexts/AppContext";
import NewAddressForm from "../Components/Forms/NewAddressForm";
import NewContactForm from "../Components/Forms/NewContactForm";
import { useAuthContext } from "../Contexts/AuthenticationContext";

export default function UserInfosPage() {
  const [appContext] = useAppContext();
  const [userInfos] = useAuthContext();

  return (
    <Box sx={{ mt: 2, flexGrow: 12 }}>
      <Main open={appContext.drawerOpened} context={appContext}>
        {!userInfos.address ? (
          <Box sx={{ mt: 5 }}>
            <NewAddressForm />
          </Box>
        ) : null}

        {!userInfos.contacts ? (
          <Box sx={{ mt: 5 }}>
            <NewContactForm />
          </Box>
        ) : null}
      </Main>
    </Box>
  );
}
