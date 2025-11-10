import { useState } from "react";

const NewDocumentModal = ({ isOpen, onClose, onCreate }) => {
    const [title, setTitle] = useState("");

    const handleCreate = () => {
        if (!title.trim()) return alert("Please enter a document title.");
        onCreate(title);
        setTitle("");
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 border border-indigo-200">
                <h2 className="text-2xl font-semibold text-indigo-700 mb-4 text-center">
                    Create New Document
                </h2>

                <input
                    type="text"
                    placeholder="Enter document title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none mb-4"
                />

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleCreate}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 active:scale-95 transition"
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewDocumentModal;
