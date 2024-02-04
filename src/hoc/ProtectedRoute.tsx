import { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector.ts";
import Layout from "../components/layout/Layout.tsx";

interface IProtectedRoute {
  onlyUnAuth: boolean;
  onlyAdmin: boolean;
  component: JSX.Element;
}

const ProtectedRoute = ({
  onlyUnAuth = false,
  onlyAdmin = false,
  component,
}: IProtectedRoute): JSX.Element => {
  const user = useAppSelector((state) => state.user);
  console.log(user);
  const location = useLocation();
  const admin = user?.role === "admin";
  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (onlyAdmin && !admin) {
    return <Navigate to="/404" />;
  }

  return component;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const OnlyAuth = (props: any) => (
  <ProtectedRoute onlyUnAuth={false} {...props} />
);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const OnlyAdmin = (props: any) => (
  <ProtectedRoute onlyUnAuth={false} onlyAdmin={true} {...props} />
);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const OnlyUnAuth = (props: any) => (
  <ProtectedRoute onlyUnAuth={true} {...props} />
);
