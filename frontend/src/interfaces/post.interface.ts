export interface TagInterface {
    id: number;
    tag: string;
}

export interface PostInterface {
    id: number;
    title: string;
    content: string;
    postedAt: Date;
    postedBy: string;
    tags: TagInterface[];
}