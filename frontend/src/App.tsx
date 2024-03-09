import React, { useState, useEffect, useRef, createContext, useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";

import LoginView from "./routes/LoginView";
import PostView from "./routes/PostView";
import LoginLayoutComponent from "./layouts/LoginLayoutView";
import AuthAPIService from "./modules/auth.api";
import config from "./config";
import { User } from "./interfaces/user.interface";
import AuthContext from "./contexts/auth.context";

const App = () => {
    const [auth, setAuth] = useState<User>({ username: null, id: null });
    const intervalCheckToken = useRef<null | NodeJS.Timeout>(null);

    const handleSignout = async () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("access_token_expires_at");
        setAuth({ username: null, id: null });
        if (intervalCheckToken.current) clearTimeout(intervalCheckToken.current);
        window.open(config.ROUTE_NAMES.login, "_self");
    };

    const handleRefreshToken = async () => {
        console.log("Refresh token");
        const token = String(localStorage.getItem("access_token"));
        if (token) {
            const refreshTokenResponse = await AuthAPIService.refresh_token({ token });
            if (refreshTokenResponse.status === 200) {
                localStorage.setItem("access_token", refreshTokenResponse.data.access_token);
                localStorage.setItem("access_token_expires_at", refreshTokenResponse.data.expirationTime);
            }
        }
    };

    function handleCheckEXPTime(): () => void {
        return () => {
            const expTime = parseInt(localStorage.getItem("access_token_expires_at") || "0");
            const currentTime = Math.floor(Date.now() / 1000);
            const remainingTime = expTime - currentTime;
            console.log("Token expired In:", remainingTime);
            if (remainingTime < 900) {
                handleRefreshToken();
            }
        };
    }

    const handleCheckToken = async () => {
        const token = String(localStorage.getItem("access_token"));
        const checkTokenResponse = await AuthAPIService.profile({ token });
        if (checkTokenResponse.status === 200) {
            if (location.pathname === config.ROUTE_NAMES.login) {
                window.open(config.ROUTE_NAMES.post, "_self");
            } else {
                setAuth({ ...checkTokenResponse.data.user });
                if (!intervalCheckToken.current) {
                    console.log("Interval check token");
                    intervalCheckToken.current = setInterval(handleCheckEXPTime(), 1000);
                }
            }
        } else if (location.pathname !== config.ROUTE_NAMES.login) {
            window.open(config.ROUTE_NAMES.login, "_self");
        }
    };

    useEffect(() => {
        handleCheckToken();
        return () => {
            if (intervalCheckToken.current) clearInterval(intervalCheckToken.current);
        };
    }, []);

    return (
        <AuthContext.Provider value={auth}>
            <PrimeReactProvider>
                <Router>
                    <Routes>
                        <Route path="/sign-in" key="login" element={<LoginView />}></Route>
                        <Route path="/" key="root" element={<LoginLayoutComponent handleSignout={handleSignout} />}>
                            <Route path="/" key="posts" element={<PostView />}></Route>
                        </Route>
                    </Routes>
                </Router>
            </PrimeReactProvider>
        </AuthContext.Provider>
    );
};

export default App;
