import {JSX} from "react";
import {Navigate, useLocation} from "react-router-dom";
import {useAppSelector} from "../hooks/useAppSelector.ts";
import Layout from "../components/layout/Layout.tsx";

interface IProtectedRoute {
    onlyUnAuth: boolean,
    component: JSX.Element
}

const ProtectedRoute = ({onlyUnAuth = false, component}: IProtectedRoute): JSX.Element => {
    const user = useAppSelector(state => state.user)
    console.log(user)
    const location = useLocation()

    if (onlyUnAuth && user) {
        const { from } = location.state || {from: { pathname: "/" }}
        return <Navigate to={from}/>
    }

    if (!onlyUnAuth && !user) {
        return <Navigate to="/login" state={{ from: location }}/>
    }

    return component
}

export const OnlyAuth = (props: any) => <ProtectedRoute onlyUnAuth={false} {...props}/>
export const OnlyUnAuth = (props: any) => <ProtectedRoute onlyUnAuth={true} {...props}/>
