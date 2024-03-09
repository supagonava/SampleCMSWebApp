import { PostInterface } from "@/interfaces/post.interface";
import dayjs from "dayjs";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

interface PostItemComponentInterface {
    record: PostInterface;
    contentVisible: boolean;
    onHideModal: () => void;
    onShowModal: () => void;
}

function PostItemComponent({ record, contentVisible, onHideModal, onShowModal }: PostItemComponentInterface): React.JSX.Element {
    const MetaContent = (
        <div className="flex justify-between items-end">
            <div className="flex gap-1 flex-wrap w-3/5 items-center">
                <p className="text-[0.6rem]">Tags: {Array.from(record.tags).length === 0 && "ไม่มี Tag ใดๆ"}</p>
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
    );

    const DialogHeader = (
        <div className="flex flex-col gap-1">
            <div className="flex gap-1 items-center pb-2 border-b justify-between">
                <p className="text-[1.25rem] font-bold text-primary w-3/4">{record.title}</p>
                <Button onClick={() => onHideModal()} style={{ border: "0px", padding: "0.25rem" }} severity="secondary" rounded outlined>
                    <IoMdCloseCircleOutline className="text-[2.5rem]" />
                </Button>
            </div>
            {MetaContent}
        </div>
    );

    const DialogContent = <div className="text-[0.9rem] py-[8px] border p-2" dangerouslySetInnerHTML={{ __html: String(record.content) }} />;

    return (
        <div key={`post-${record.id}`} className="flex flex-col border-b py-2 w-full">
            <Dialog closable={false} header={DialogHeader} className="sm:w-1/2 lg:w-1/3 w-full" draggable={false} position="top" onHide={() => onHideModal()} visible={contentVisible}>
                {DialogContent}
            </Dialog>

            <p onClick={() => onShowModal()} className="font-bold text-[1rem] text-primary hover:cursor-pointer hover:text-secondary">
                {record.title}
            </p>
            <div className="text-[0.6rem] py-[8px]" dangerouslySetInnerHTML={{ __html: String(record.content).substring(0, 100) + "..." }} />
            {MetaContent}
        </div>
    );
}

export default PostItemComponent;
