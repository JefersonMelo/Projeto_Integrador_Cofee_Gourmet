import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LeftDrawer from "../Components/Drawers/LeftDrawer";
import WarningSnackBar from "../Components/SnackBars/WarningSnackBar";
import RegistrationForm from "../Components/Forms/RegistrationForm";
import PageNotFound from "../Pages/PageNotFound";
import MainPage from "../Pages/MainPage";
import PrivateRoutes from "../Services/PrivateRoute"

export default function AppRoutes() {

    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes*/}
                <Route path="/" exact element={<LeftDrawer Element={MainPage} />} />
                <Route path="/home" exact element={<LeftDrawer />} />
                <Route path="/new/user" exact element={<LeftDrawer />} />
                <Route path="*" element={<PageNotFound />} />

                {/* Private Routes*/}
                <Route element={<PrivateRoutes />}>
                    <Route path="/login" exact element={<RegistrationForm />} />
                </Route>

            </Routes>
            <WarningSnackBar />
        </BrowserRouter>
    );
}