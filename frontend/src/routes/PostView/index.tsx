import Axios from "@/modules/axios";
import dayjs from "dayjs";
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
    const [loading, setLoading] = useState<Boolean>(false);
    const [query, setQuery] = useState<QueryInterface>({ search: "", tags: [], order_by: null });
    const [pagination, setPagination] = useState<PaginationInterface>({ page: 1, per_page: 10, totle: 0, start_at: 1 });
    const [records, setRecords] = useState<PostInterface[]>([]);
    const [selectedID, setSelectedID] = useState<number | null>(null);

    const handleFetchData = async (page = 1, per_page = 10) => {
        setLoading(true);
        const response = await Axios.get("api/v1/posts", { params: { ...query, page, per_page } });
        if (response.status === 200) {
            setRecords(Array.from(response.data?.data || []));
            setPagination({ ...pagination, page, per_page, start_at: response.data?.start_at, totle: response.data?.total });
        }
        setLoading(false);
    };

    useEffect(() => {
        handleFetchData();
    }, []);

    return (
        <div className="flex flex-col items-center">
            {loading && (
                <div className="flex flex-col gap-2 p-4">
                    {Array.from({ length: 5 }, (_, i) => i + 1).map((i) => (
                        <div className="h-[1.5rem] w-[88vw] bg-slate-100 animate-pulse rounded-md"></div>
                    ))}
                </div>
            )}
            {!loading && (
                <div className="flex flex-col gap-2  w-full sm:p-[24px] p-[16px]">
                    {records.map((record) => (
                        <div key={`post-${record.id}`} className="flex flex-col border-b py-2 w-full">
                            <p className="font-bold text-[1rem] text-primary hover:cursor-pointer hover:text-secondary">{record.title}</p>
                            <div className="text-[0.6rem] py-[8px]" dangerouslySetInnerHTML={{ __html: String(record.content).substring(0, 100) + "..." }} />
                            <div className="flex justify-between items-end">
                                <div className="flex gap-1 flex-wrap w-3/5">
                                    {Array.from(record.tags).map((item) => (
                                        <div key={`post-${record.id}-${item.id}`} className="p-1 bg-secondary text-[0.6rem] text-white rounded-md">
                                            {item.tag}
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-[0.7rem] text-slate-600">ผู้เขียน {record.postedBy}</p>
                                    <p className="text-[0.7rem] text-slate-600">เมื่อ {dayjs(record.postedAt).format("DD-MM-YYYY HH:MM")}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <Paginator first={pagination.start_at} onPageChange={(ev) => handleFetchData(ev.page + 1)} totalRecords={pagination.totle} rows={pagination.per_page} />
        </div>
    );
};
export default PostView;
