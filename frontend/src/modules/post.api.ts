import { QueryInterface } from "@/interfaces/post.interface";
import Axios from "@/modules/axios";

const PostAPIService = {
    "list": async (params: any) => {
        const response = await Axios.get("/api/v1/posts", { params: params });
        return response;
    },
    "list_tags": async () => {
        const response = await Axios.get("/api/v1/posts/tags");
        return response;
    },
}
export default PostAPIService;