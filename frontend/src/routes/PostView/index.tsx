import PostItemComponent from "@/components/PostItemComponent";
import { PaginationInterface, PostInterface, QueryInterface } from "@/interfaces/post.interface";
import Axios from "@/modules/axios";
import PostAPIService from "@/modules/post.api";
import dayjs from "dayjs";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { Paginator } from "primereact/paginator";
import { Tag } from "primereact/tag";
import React from "react";
import { useEffect, useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";

const SORT_OPTIONS = ["title", "postedAt"];

const PostView = () => {
    const [loading, setLoading] = useState<Boolean>(false);
    const [query, setQuery] = useState<QueryInterface>({ search: "", tags: [], order_by: "title" });
    const [pagination, setPagination] = useState<PaginationInterface>({ page: 1, per_page: 10, total: 0, start_at: 1 });
    const [tags, setTags] = useState<string[]>([]);
    const [records, setRecords] = useState<PostInterface[]>([]);
    const [selectedID, setSelectedID] = useState<number | null>(null);

    const handleFetchData = async (page = 1, per_page = 10) => {
        setLoading(true);

        // fetch tags
        const responseTags = await PostAPIService.list_tags();
        if (responseTags.status === 200) setTags(Array.from(responseTags.data.data || []).map((item) => item.tag));

        const response = await PostAPIService.list({ ...query, page, per_page });
        if (response.status === 200) {
            setRecords(Array.from(response.data?.data || []));
            setPagination({ ...pagination, page, per_page, start_at: response.data?.start_at, total: response.data?.total });
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
                        <div key={`loading-idx-${i}`} className="h-[1.5rem] w-[88vw] bg-slate-100 animate-pulse rounded-md"></div>
                    ))}
                </div>
            )}
            {!loading && (
                <div className="flex flex-col gap-2  w-full sm:p-[24px] p-[16px]">
                    <div className="relative">
                        <p className="absolute -top-3 -left-1 bg-white font-semibold text-secondary">Filter Form</p>
                        <div className="flex flex-col gap-2 p-4 border rounded-md">
                            <div className="flex flex-wrap">
                                <div className="sm:w-1/3 w-full flex flex-col pl-2">
                                    Search : <InputText value={query.search} onChange={(e) => setQuery({ ...query, search: e.target.value })} placeholder="Filter Title" />
                                </div>
                                <div className="sm:w-1/3 w-full flex flex-col pl-2">
                                    Tags :{" "}
                                    <MultiSelect options={tags} placeholder="Filter Tags" value={query.tags} onChange={(e) => setQuery({ ...query, tags: e.target.value })} />
                                </div>
                                <div className="sm:w-1/3 w-full flex flex-col pl-2">
                                    Order By :{" "}
                                    <Dropdown placeholder="Sort By" value={query.order_by} onChange={(e) => setQuery({ ...query, order_by: e.value })} options={SORT_OPTIONS} />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Button onClick={() => handleFetchData()} size="small" className="w-[8rem]">
                                    <div className="flex gap-2 items-center justify-center">
                                        <FaSearch />
                                        <p>Search</p>
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </div>
                    {records.map((record) => (
                        <PostItemComponent
                            key={`post-id-${record.id}`}
                            onShowModal={() => setSelectedID(record.id)}
                            onHideModal={() => setSelectedID(null)}
                            contentVisible={selectedID !== null && record.id === selectedID}
                            record={record}
                        />
                    ))}
                </div>
            )}
            <Paginator first={pagination.start_at} onPageChange={(ev) => handleFetchData(ev.page + 1)} totalRecords={pagination.total} rows={pagination.per_page} />
        </div>
    );
};
export default PostView;
