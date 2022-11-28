import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { Main } from "./Config/MainStyle";
import { Typography } from "@mui/material";
import { useAppContext } from "../Contexts/AppContext";
import { useUserContext } from "../Contexts/UserContext";
import { useAuthContext } from "../Contexts/AuthenticationContext";
import { ShowErrorSnackBar } from "../Helpers/SnackBars";
import api from "../Services/api";
import { apiRouts } from "../Helpers/Globals";
import ButtonPayment from "../Components/Buttons/ButtonPayment";
import CardAddressInfo from "../Components/Cards/CardAddressInfo";
import CardCreditcardInfo from "../Components/Cards/CardCreditcardInfo";
import CardContactsInfo from "../Components/Cards/CardContactsInfo";
import { useCarShopContext } from "../Contexts/CarShopContext";
import ColumnStack from "../Components/Stacks/ColumnStack";
import CardCarShop from "../Components/Cards/CardCarShop";


export default function PageInfoValidation() {
  const [appContext, setAppContext] = useAppContext();
  const [userContext, setUserContext] = useUserContext();
  const [, setShopContext] = useCarShopContext();
  const [items, setItems] = useState([]);
  const [authContext] = useAuthContext();
  const navigate = useNavigate();
  window.scrollTo(0,0);

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

  // useEffect(() => {
  //   /*IDENTIFICATION*/
  //   let routeIdentification = api.get(
  //     apiRouts.GET_IDENTIFICATION_BY_USER_ID.replace(
  //       "%user_id%",
  //       authContext.userid
  //     )
  //   );

  //   /*ADDRESS*/
  //   let routeAddress = api.get(
  //     apiRouts.GET_ADDRESS_BY_USER_ID.replace("%user_id%", authContext.userid)
  //   );

  //   /*CONTACTS*/
  //   let routeContacts = api.get(
  //     apiRouts.GET_CONTACTS_BY_USER_ID.replace("%user_id%", authContext.userid)
  //   );

  //   /*CREDITCARD*/
  //   let routeCreditcard = api.get(
  //     apiRouts.GET_CREDITCARD_BY_USER_ID.replace(
  //       "%user_id%",
  //       authContext.userid
  //     )
  //   );

  //   axios.all([
  //       routeIdentification,
  //       routeAddress,
  //       routeContacts,
  //       routeCreditcard
  //     ])
  //     .then(
  //       axios.spread((res1, res2, res3, res4) => {
  //         /*IDENTIFICATION*/
  //         if (res1.data.results) {
  //           setUserContext((prev) => ({
  //             ...prev,
  //             identification: res1.data.results,
  //           }));
  //         }

  //         /*ADDRESS*/
  //         if (res2.data.results) {
  //           setUserContext((prev) => ({
  //             ...prev,
  //             address: res2.data.results,
  //           }));
  //         }

  //         /*CONTACTS*/
  //         if (res3.data.results) {
  //           setUserContext((prev) => ({
  //             ...prev,
  //             contacts: res3.data.results,
  //           }));
  //         }
  //         /*CREDITCARD*/
  //         if (res4.data.results) {
  //           setUserContext((prev) => ({
  //             ...prev,
  //             creditcard: res4.data.results,
  //           }));
  //         }
  //       })
  //     )
  //     .catch(() => ShowErrorSnackBar(err, setAppContext));

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    api.get(
        apiRouts.GET_CAR_SHOP_BY_USER_ID.replace(
          "%user_id%",
          authContext.userid
        )
      )
      .then((res) => {
        setItems(res.data.results);
        setShopContext((prev) => ({
          ...prev,
          itemsCarShop: res.data.results,
        }));
      })
      .catch((err) => {
        ShowErrorSnackBar(err, setAppContext);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appContext.refresh]);

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
          <Typography variant="h6">CONFIRME SUAS INFORMAÇÕES</Typography>
        </Box>
        {userContext.address ? <CardAddressInfo /> : null}
        {userContext.creditcard ? <CardCreditcardInfo /> : null}
        {userContext.contacts ? <CardContactsInfo /> : null}
        {items ? <ColumnStack Element={CardCarShop} values={items} /> : navigate("/home")}

        <Box sx={{ mt: 5 }}>
          <ButtonPayment />
        </Box>
      </Main>
    </Box>
  );
}
