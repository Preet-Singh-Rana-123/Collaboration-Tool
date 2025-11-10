import React from "react";
import { fetchDocument } from "../redux/documentSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const DocumentCard = ({ title, role, document_id }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDocumentClick = () => {
        dispatch(fetchDocument(document_id));
        navigate(`/editor/${document_id}`);
    };

    return (
        <div
            onClick={handleDocumentClick}
            className="bg-white/80 backdrop-blur-lg shadow-md rounded-xl p-5 border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer"
        >
            <div className="flex flex-col h-full justify-between">
                <div>
                    <div className="flex mb-3 items-center justify-start gap-[4px]">
                        <h3 className="text-lg font-semibold text-indigo-700 truncate">
                            {title}
                        </h3>
                        <p className="text-[0.7rem] font-bold">({role})</p>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                        Quick access to your document.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DocumentCard;
