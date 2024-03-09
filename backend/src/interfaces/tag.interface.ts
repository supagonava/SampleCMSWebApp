import { Post } from "./post.interface";

export interface Tag {
    id: number;
    tag: string;
    posts: Post[];
}