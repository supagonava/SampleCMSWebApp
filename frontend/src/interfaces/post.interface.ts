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

export interface QueryInterface {
    search: string;
    tags: string[];
    order_by: string;
}


export interface PaginationInterface {
    page: number;
    per_page: number;
    total: number;
    start_at: number;
}