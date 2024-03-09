import { Button } from "primereact/button";
import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import config from "@/config";
import { FaSignOutAlt } from "react-icons/fa";

const LoginLayoutComponent = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleSignOut = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("access_token_expires_at");
        return navigate(config.ROUTE_NAMES.login);
    };
    // handle route
    useEffect(() => {
        if (location.pathname === "/") navigate(config.ROUTE_NAMES.login);
    }, []);

    return (
        <div className="w-full min-h-screen flex flex-col">
            <div className="h-[80px] bg-primary flex justify-between items-center px-2">
                <div className="w-1/3" />
                <p className="text-white font-bold text-[2rem] text-center w-1/3">Skin-X</p>
                <div className="w-1/3 flex justify-end">
                    <Button onClick={() => handleSignOut()} size="small" severity="danger">
                        <FaSignOutAlt />
                    </Button>
                </div>
            </div>
            <Outlet />
        </div>
    );
};

export default LoginLayoutComponent;
