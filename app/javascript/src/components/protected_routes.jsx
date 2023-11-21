import React from "react";

import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoutes = () => {
  const { user } = useSelector((state) => state.user);

	return user ? <Outlet /> : <Navigate to="/sign_in"  replace />;
};
