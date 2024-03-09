import appconfig from "@/config";
import axios from "axios";

const APIAxios = axios.create({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    baseURL: appconfig.REACT_APP_BACKEND_URL
});

APIAxios.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            // Handle error response similarly
            return {
                ...error.response,
                status: error.response.status
            };
        }
        return Promise.reject(error);
    }
);

export default APIAxios;
