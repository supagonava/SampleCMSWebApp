import PostItemComponent from "@/components/PostItemComponent";
import { PostInterface } from "@/interfaces/post.interface";
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
                        <PostItemComponent
                            onShowModal={() => setSelectedID(record.id)}
                            onHideModal={() => setSelectedID(null)}
                            contentVisible={selectedID !== null && record.id === selectedID}
                            record={record}
                        />
                    ))}
                </div>
            )}
            <Paginator first={pagination.start_at} onPageChange={(ev) => handleFetchData(ev.page + 1)} totalRecords={pagination.totle} rows={pagination.per_page} />
        </div>
    );
};
export default PostView;
