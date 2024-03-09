import Axios from "@/modules/axios";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { Paginator } from "primereact/paginator";
import React from "react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

interface QueryInterface {
    search: string;
    tags: never[];
    order_by: null;
}

interface PaginationInterface {
    page: number;
    per_page: number;
    totle: number;
    start_at: number;
}

interface TagInterface {
    id: number;
    tag: string;
}

interface PostInterface {
    id: number;
    title: string;
    content: string;
    postedAt: Date;
    postedBy: string;
    tags: TagInterface[];
}

const PostView = () => {
    const [query, setQuery] = useState<QueryInterface>({ search: "", tags: [], order_by: null });
    const [pagination, setPagination] = useState<PaginationInterface>({ page: 1, per_page: 10, totle: 0, start_at: 1 });
    const [records, setRecords] = useState<PostInterface[]>([]);
    const [selectedID, setSelectedID] = useState<number | null>(null);

    const handleFetchData = async (page = 1, per_page = 10) => {
        const response = await Axios.get("api/v1/posts", { params: { ...query, page, per_page } });
        if (response.status === 200) {
            setRecords(Array.from(response.data?.data || []));
            setPagination({ ...pagination, page, per_page, start_at: response.data?.start_at, totle: response.data?.total });
        }
    };

    useEffect(() => {
        handleFetchData();
    }, []);

    return (
        <div className="p-[16px] w-full">
            <div className="flex flex-col gap-2">
                {records.map((record) => (
                    <div key={`post-${record.id}`} className="flex items-center justify-between border-b py-2">
                        <div className="flex flex-col">
                            <p className="font-bold text-[1rem]">{record.title}</p>
                            <div className="text-[0.6rem] py-[8px]" dangerouslySetInnerHTML={{ __html: String(record.content).substring(0, 100) + "..." }} />
                            <div className="flex gap-1 flex-wrap">
                                {Array.from(record.tags).map((item) => (
                                    <div key={`post-${record.id}-${item.id}`} className="p-1 bg-secondary text-[0.6rem] text-white rounded-md">
                                        {item.tag}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Button outlined className="h-[0.65rem]">
                            <p className="text-[0.7rem]">Read More...</p>
                        </Button>
                    </div>
                ))}
            </div>
            <Paginator first={pagination.start_at} onPageChange={(ev) => handleFetchData(ev.page + 1)} totalRecords={pagination.totle} rows={pagination.per_page} />
        </div>
    );
};
export default PostView;
