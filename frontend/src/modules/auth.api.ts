import Axios from "@/modules/axios";

const AuthAPIService = {
    "signin": async ({ username, password }: { username: string, password: string }) => {
        const authResponse = await Axios.post("/api/v1/auth", { username, password });
        return authResponse;
    },
    "refresh_token": async ({ token }: { token: string }) => { }
}
export default AuthAPIService;