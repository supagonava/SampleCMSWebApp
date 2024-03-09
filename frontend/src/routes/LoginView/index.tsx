import AuthAPIService from "@/modules/auth.api";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React from "react";
import { useState } from "react";
import * as FaIcons from "react-icons/fa";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const LoginView = () => {
    const naviate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleClickLogin = async () => {
        if (username && password) {
            const signinResponse = await AuthAPIService.signin({ username, password });
            if (signinResponse.status === 200 && signinResponse.data?.access_token?.token) {
                localStorage.setItem("access_token", signinResponse.data.access_token.token);
                localStorage.setItem("access_token_expires_at", signinResponse.data.access_token.expires_at);
                await Swal.fire({ text: signinResponse.data.message, icon: "success", timer: 2000 });
                naviate("/posts");
            } else {
                Swal.fire({ text: signinResponse.data.message, icon: "error" });
            }
        }
    };

    return (
        <div className="w-screen h-screen bg-slate-100">
            <div className="w-full h-full flex justify-center items-center p-[8px]">
                <div className="flex flex-col bg-white md:w-1/3 sm:w-1/2 w-4/5 p-[16px] rounded-md">
                    <p className="w-full text-center font-bold text-primary text-[2rem]">SKIN-X</p>
                    <p className="w-full text-center font-bold text-primary text-[1.5rem] mb-4">Login</p>
                    <div className="flex gap-2 items-center my-2">
                        <p className="w-[8rem] text-[0.9rem]">Username : </p>
                        <InputText onChange={(ev) => setUsername(ev.target.value)} className="w-full h-[2.5rem]" value={username} />
                    </div>
                    <div className="flex gap-2 items-center mb-2">
                        <p className="w-[8rem] text-[0.9rem]">Password : </p>
                        <InputText onChange={(ev) => setPassword(ev.target.value)} className="w-full h-[2.5rem]" value={password} type="password" />
                    </div>
                    <Button size="small" onClick={(_e) => handleClickLogin()}>
                        <div className="flex w-full items-center justify-center gap-2">
                            <FaIcons.FaSignInAlt />
                            <p>เข้าสู่ระบบ</p>
                        </div>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default LoginView;
