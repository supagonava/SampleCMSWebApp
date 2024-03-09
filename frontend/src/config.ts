const REACT_APP_NAME = "SKINX-TEST";
const APP_ENV = process.env.REACT_APP_ENV ?? "DEVELOP";
const REACT_APP_BACKEND_URL = "http://localhost:8000";

const ROUTE_NAMES = {
    "login": "/sign-in",
    "post": "/posts",
}

export default { REACT_APP_NAME, APP_ENV, REACT_APP_BACKEND_URL, ROUTE_NAMES };
