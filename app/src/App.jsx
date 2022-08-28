import "./App.css";
import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import LeftDrawer from "./Components/Drawers/LeftDrawer";
import WarningSnackBar from "./Components/SnackBars/WarningSnackBar";
import RegistrationForm from "./Components/Forms/RegistrationForm";
import PageNotFound from "./Pages/PageNotFound";
import MainPage from "./Pages/MainPage";

export default function App() {

  return (
    <React.Fragment>
      <CssBaseline />
      <BrowserRouter>
        <Box sx={{ display: "flex", overflow: "hidden" }}>
          <Box
            component={"main"}
            sx={{ mt: 0.01, width: "100%", height: "100%" }}
          >
            <Routes>
              <Route
                path="/"
                exact
                element={<LeftDrawer Element={MainPage} />}
              />
              <Route path="/login" exact element={<RegistrationForm />} />
              <Route path="/home" exact element={<LeftDrawer />} />
              <Route path="/new/user" exact element={<LeftDrawer />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Box>
        </Box>
        <WarningSnackBar />
      </BrowserRouter>
    </React.Fragment>
  );
}
