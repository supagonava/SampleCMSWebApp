import appconfig from "@/config";
import axios from "axios";

const APIAxios = axios.create({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    baseURL: appconfig.REACT_APP_BACKEND_URL
});

APIAxios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            return {
                ...error.response,
                status: error.response.status
            };
        }
        return Promise.reject(error);
    }
);

export default APIAxios;
