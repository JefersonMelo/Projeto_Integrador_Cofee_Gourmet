import React from "react";
import { Outlet, Navigate } from 'react-router-dom'
import { useUserContext } from "../Contexts/UserContext";


const PrivateRoutes = () => {
  const [userContext] = useUserContext();
  let auth = { 'token': userContext.token }
  return (
    auth.token ? <Outlet /> : <Navigate to="/" />
  )
}

export default PrivateRoutes