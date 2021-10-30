import React, {useState, useEffect} from 'react'
import { Redirect, Link } from "react-router-dom";

import { logoutAPI } from '../axios/commonMethod'

export const LogoutComponent = () => {
    const [isLogout, setIsLogout] = useState(false);

    useEffect(() => {
        logout()
    }, [])

    const logout = async () => {
        const res = await logoutAPI(sessionStorage.getItem("loginAdminId"));
        sessionStorage.clear();
        setIsLogout(true)
    }

    return <div>{isLogout && <Redirect to="/" />}</div>;
}
