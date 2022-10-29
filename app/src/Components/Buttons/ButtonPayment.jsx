import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { useAppContext } from "../../Contexts/AppContext";
import { apiRouts } from "../../Helpers/Globals";
import api from "../../Services/api";

export default function ButtonPayment() {
  const [userContext, setUserContext] = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    api.get(apiRouts.GET_CONTACTS_AND_ADDRESS_BY_USER_ID.replace("%user_id%", userContext.userid))
      .then((res) => {
        setUserContext((prev) => ({
          ...prev,
          contacts: res.data.contacts,
          address: res.data.address,
        }));
      })
      .catch((err) => console.log(err));
  }, []);

  const infos = () => {
    if (!userContext.contacts && !userContext.address) {
      return "Cadastrar Endereço e Contatos e Depois Pagamento";
    } else if (!userContext.contacts) {
      return "Cadastrar Contatos e Depois Pagamento";
    } else if (!userContext.address) {
      return "Cadastrar Endereço e Depois Pagamento";
    } else {
      return "Seguir Para Pagamento";
    }
  };

  return (
    <Box>
      <Button
        sx={{ mt: "20px", width: "100%" }}
        variant="contained"
        onClick={() =>
          !userContext.contacts || !userContext.address
            ? navigate("/user/add/infos")
            : navigate("/payment")
        }
      >
        {infos()}
      </Button>
    </Box>
  );
}
