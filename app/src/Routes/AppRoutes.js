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
import PaymentPage from "../Pages/PagePayment";
import PageInfoValidation from "../Pages/PageInfoValidation";
import PageUserConfig from "../Pages/PageUserConfig";
import UserTestPage from "../Pages/UserTestPage";
import PublicPageBeansMedium from "../Pages/PublicPageBeansMedium";
import PublicPageBeansNoRoast from "../Pages/PublicPageBeansNoRoast";
import PublicPageBeansSpecial from "../Pages/PublicPageBeansSpecial";
import PublicPageGroundFine from "../Pages/PublicPageGroundFine";
import PublicPageGroundGranulated from "../Pages/PublicPageGroundGranulated";
import PublicPageGroundMedium from "../Pages/PublicPageGroundMedium";
import PublicPageGroundSpecial from "../Pages/PublicPageGroundSpecial";

export default function AppRoutes() {

    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes*/}
                <Route path="/" exact element={<LeftDrawer Element={PublicPage} />} />
                <Route path="/new/user" exact element={<BorderBox liginOrRegistration={true} Element={RegistrationForm} />} />
                <Route path="/login" exact element={<BorderBox liginOrRegistration={true} Element={LoginForm} />} />
                
                <Route path="/beans/medium" exact element={<LeftDrawer Element={PublicPageBeansMedium} />} />
                <Route path="/beans/no/roast" exact element={<LeftDrawer Element={PublicPageBeansNoRoast} />} />
                <Route path="/beans/special" exact element={<LeftDrawer Element={PublicPageBeansSpecial} />} />

                <Route path="/ground/fine" exact element={<LeftDrawer Element={PublicPageGroundFine} />} />
                <Route path="/ground/granulated" exact element={<LeftDrawer Element={PublicPageGroundGranulated} />} />
                <Route path="/ground/medium" exact element={<LeftDrawer Element={PublicPageGroundMedium} />} />
                <Route path="/ground/special" exact element={<LeftDrawer Element={PublicPageGroundSpecial} />} />
               
                <Route path="*" element={<PageNotFound />} />

                {/* Private Routes*/}
                <Route element={<PrivateRoutes />}>
                    <Route path="/home" exact element={<LeftDrawer Element={Home} />} />
                    <Route path="/user/car/shop" exact element={<LeftDrawer Element={CarShopPage} />} />
                    <Route path="/user/add/infos" exact element={<LeftDrawer Element={UserInfosPage} />} />
                    <Route path="/payment" exact element={<LeftDrawer Element={PaymentPage} />} />
                    <Route path="/user/info/validation" exact element={<LeftDrawer Element={PageInfoValidation} />} />
                    <Route path="/user/config" exact element={<LeftDrawer Element={PageUserConfig} />} />
                    <Route path="/my/tests" exact element={<LeftDrawer Element={UserTestPage} />} />
                </Route>

            </Routes>
            <WarningSnackBar />
        </BrowserRouter>
    );
}
