import React from "react";
import { Outlet, Navigate } from 'react-router-dom'
import { isAuthenticated } from "./auth";

const PrivateRoutes = () => {
  let auth = { 'token': isAuthenticated() }
  return (
    auth.token ? <Outlet /> : <Navigate to="/" />
  )
}

export default PrivateRoutes