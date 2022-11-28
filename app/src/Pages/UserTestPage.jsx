import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { Button, Divider, Stack } from "@mui/material";
import { Main } from "./Config/MainStyle";
import { useAppContext } from "../Contexts/AppContext";
import { useUserContext } from "../Contexts/UserContext";
import api from "../Services/api";
import { apiRouts } from "../Helpers/Globals";
import { useAuthContext } from "../Contexts/AuthenticationContext";
import { ShowErrorSnackBar } from "../Helpers/SnackBars";
import NewTestForm from "../Components/Forms/NewTestForm";
import EditTestForm from "../Components/Forms/EditTestForm";

export default function UserTestPage() {
  const [appContext, setAppContext] = useAppContext();
  const [userContext, setUserContext] = useUserContext();
  const [listTests, setListTests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [authContext] = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    api.get(
        apiRouts.GET_ALL_TESTS_BY_USER_ID.replace(
          "%user_id%",
          authContext.userid
        )
      )
      .then((res) => {
        setListTests(res.data.results);
        setUserContext((prev) => ({
          ...prev,
          tests: res.data.results,
        }));
      })
      .catch((err) => ShowErrorSnackBar(err, setAppContext));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    if (userContext.tests) {
      setListTests(userContext.tests);
    }
  }, [userContext.tests]);

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
        <Box key={"box-new-form-test"} sx={{ mt: 5, mb: 7 }}>
          <NewTestForm setIsLoading={setIsLoading} />
          <Divider />
        </Box>

        {listTests.length ? (
          <Box key={"box-loop-form-test"} sx={{ mb: 7 }}>
            {listTests?.map((row, index) => (
              <EditTestForm row={row} index={index} />
            ))}
          </Box>
        ) : null}
      </Main>
    </Box>
  );
}
