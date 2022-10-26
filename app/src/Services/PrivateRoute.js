import React from "react";
import { Outlet, Navigate } from 'react-router-dom'
import { useAuthContext } from "../Contexts/AuthenticationContext";


const PrivateRoutes = () => {
  const [authContext] = useAuthContext();
  let auth = { 'token': authContext.token }
  return (
    auth.token ? <Outlet /> : <Navigate to="/" />
  )
}

export default PrivateRoutes