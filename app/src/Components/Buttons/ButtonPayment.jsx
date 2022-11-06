import React, { useEffect }  from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { useAppContext } from "../../Contexts/AppContext";

export default function ButtonPayment() {
  const [userContext, setUserContext] = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    setUserContext((prev) => ({
      ...prev,
      contacts: {
        tel: "123",
      },
      address: {
        rua: "123",
      },
    }));
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
      {/* <Tooltip title={infos()} arrow>
        <Typography component={"span"} variant={"body2"}> */}
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
      {/* </Typography>
      </Tooltip> */}
    </Box>
  );
}
