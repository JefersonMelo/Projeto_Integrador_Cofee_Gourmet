import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LeftDrawer from "../Components/Drawers/LeftDrawer";
import WarningSnackBar from "../Components/SnackBars/WarningSnackBar";
import RegistrationForm from "../Components/Forms/RegistrationForm";
import PageNotFound from "../Pages/PageNotFound";
import PublicPage from "../Pages/PublicPage";
import Home from "../Pages/Home"
import PrivateRoutes from "../Services/privateRoute"
import LoginForm from "../Components/Forms/LoginForm"
import BorderBox from "../Components/Boxes/BorderBox";
import CarShopPage from "../Pages/CarShopPage";

export default function AppRoutes() {

    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes*/}
                <Route path="/" exact element={<LeftDrawer Element={PublicPage} />} />
                <Route path="/new/user" exact element={<BorderBox Element={RegistrationForm} />} />
                <Route path="/login" exact element={<BorderBox Element={LoginForm} />} />
                <Route path="*" element={<PageNotFound />} />

                {/* Private Routes*/}
                <Route element={<PrivateRoutes />}>
                    <Route path="/home" exact element={<LeftDrawer Element={Home} />} />
                    <Route path="/user/car/shop" exact element={<LeftDrawer Element={CarShopPage} />} />
                </Route>

            </Routes>
            <WarningSnackBar />
        </BrowserRouter>
    );
}
