import Axios from "@/modules/axios";

const AuthAPIService = {
    "signin": async ({ username, password }: { username: string, password: string }) => {
        const authResponse = await Axios.post("/api/v1/auth", { username, password });
        return authResponse;
    },
    "refresh_token": async ({ token }: { token: string }) => {
        const refreshResponse = await Axios.post("/api/v1/auth/refresh");
        return refreshResponse;
    },
    "profile": async ({ token }: { token: string }) => {
        const refreshResponse = await Axios.get("/api/v1/auth/me");
        return refreshResponse;
    }
}
export default AuthAPIService;