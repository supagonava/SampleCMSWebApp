import { Button } from "primereact/button";
import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import config from "@/config";

const LoginLayoutComponent = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // handle route
    useEffect(() => {
        if (location.pathname === "/") navigate(config.ROUTE_NAMES.login);
    }, []);

    return (
        <div className="w-full min-h-screen flex flex-col">
            <div className="h-[80px] bg-primary flex justify-between items-center px-2">
                <div className=""></div>
                <p className="text-white font-bold text-[2rem]">SkinX Posts</p>
                <Button onClick={() => navigate(config.ROUTE_NAMES.login)} size="small" severity="danger">
                    <p>ออก</p>
                </Button>
            </div>
            <Outlet />
        </div>
    );
};

export default LoginLayoutComponent;
