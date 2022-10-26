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
import UserInfosPage from "../Pages/UserInfosPage";
import PaymentPage from "../Pages/PaymentPage";

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
                    <Route path="/user/add/infos" exact element={<LeftDrawer Element={UserInfosPage} />} />
                    <Route path="/payment" exact element={<LeftDrawer Element={PaymentPage} />} />
                </Route>

            </Routes>
            <WarningSnackBar />
        </BrowserRouter>
    );
}
