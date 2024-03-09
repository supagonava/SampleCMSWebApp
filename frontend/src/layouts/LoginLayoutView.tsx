import { Button } from "primereact/button";
import React, { useContext } from "react";
import { Outlet } from "react-router";
import { FaSignOutAlt } from "react-icons/fa";
import AuthContext from "@/contexts/auth.context";

const LoginLayoutComponent = ({ handleSignout }: { handleSignout: () => void }) => {
    const { username } = useContext(AuthContext);

    return (
        <div className="w-full min-h-screen flex flex-col">
            <div className="h-[80px] bg-primary flex justify-between items-center px-2">
                <div className="w-1/3" />
                <div className="flex flex-col items-center w-1/3">
                    <p className="text-white font-bold text-[2rem] text-center">Skin-X</p>
                    <p className="text-white font-bold text-[1rem] text-center">ยินดีต้อนรับ {username}</p>
                </div>
                <div className="w-1/3 flex justify-end">
                    <Button onClick={() => handleSignout()} size="small" severity="danger">
                        <FaSignOutAlt />
                    </Button>
                </div>
            </div>
            <Outlet />
        </div>
    );
};

export default LoginLayoutComponent;
