import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";

import LoginView from "./routes/LoginView";
import PostView from "./routes/PostView";
import LoginLayoutComponent from "./layouts/LoginLayoutView";

const App = () => {
    return (
        <PrimeReactProvider>
            <Router>
                <Routes>
                    <Route path="/sign-in" key="login" element={<LoginView />}></Route>
                    <Route path="/" key="root" element={<LoginLayoutComponent />}>
                        <Route path="/posts" key="posts" element={<PostView />}></Route>
                    </Route>
                </Routes>
            </Router>
        </PrimeReactProvider>
    );
};

export default App;
