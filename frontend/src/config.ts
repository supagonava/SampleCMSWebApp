const REACT_APP_NAME = "SKINX-TEST";
const APP_ENV = process.env.REACT_APP_ENV ?? "DEVELOPMENT";
const REACT_APP_BACKEND_URL = process.env.REACT_APP_API || "http://localhost:8000";

const ROUTE_NAMES = {
    "login": "/sign-in",
    "post": "/",
}

export default { REACT_APP_NAME, APP_ENV, REACT_APP_BACKEND_URL, ROUTE_NAMES };
