import { Outlet } from "react-router-dom";

import Navbar from "admin/common/Navbar";

import UserContext from "store/context/UserContext";
import { useContext } from "react";

import { Navigate } from "react-router-dom";

function Layout()
{
    const { user } = useContext(UserContext);

    if(user?.role === "admin")
    {
        return(
            <div>
                <Navbar />
                <Outlet />
            </div>
        )
    }else{
        return (
            <Navigate to="/login" />
        )
    }
}

export default Layout;