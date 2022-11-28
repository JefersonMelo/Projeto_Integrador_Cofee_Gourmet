import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import axios from "axios";
import { useAppContext } from "../../Contexts/AppContext";
import { useUserContext } from "../../Contexts/UserContext";
import { apiRouts } from "../../Helpers/Globals";
import api from "../../Services/api";
import { useAuthContext } from "../../Contexts/AuthenticationContext";
import { ShowErrorSnackBar } from "../../Helpers/SnackBars";

export default function ButtonInfoValidation() {
  const [userContext, setUserContext] = useUserContext();
  const [, setAppContext] = useAppContext();
  const [authContext] = useAuthContext();
  const navigate = useNavigate();

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
      .then(axios.spread((res1, res2, res3) => {
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

  const info = () => {
    if (
      !userContext.contacts ||
      !userContext.address ||
      !userContext.identification
    ) {
      return "Completar Cadastro";
    } else {
      return "Validar Informações de Pagamento";
    }
  };

  return (
    <Box>
      <Button
        sx={{ mt: "20px", width: "100%" }}
        variant="contained"
        onClick={() =>
          !userContext.contacts ||
          !userContext.address ||
          !userContext.identification
            ? navigate("/user/add/infos")
            : navigate("/user/info/validation")
        }
      >
        {info()}
      </Button>
    </Box>
  );
}
