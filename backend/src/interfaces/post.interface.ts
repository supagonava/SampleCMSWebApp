import { Tag } from "./tag.interface";

export interface Post {
    id: number;
    title: string;
    content: string;
    postedAt: Date;
    postedBy: string;
    tags: Tag[]
}