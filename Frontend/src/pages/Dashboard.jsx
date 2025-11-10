import { useEffect, useState } from "react";
import DocumentCard from "../components/DocumentCard";
import Navbar from "../components/Navbar";
import NewDocumentModal from "../components/NewDocumentModal";
import JoinDocumentModal from "../components/JoinDocumentModal";
import { createDocumentApi, joinDocumentApi } from "../api/documentApi";
import { getUserDocumentApi } from "../api/documentApi";
import { useSelector } from "react-redux";

const Dashboard = () => {
    const [documents, setDocuments] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isJoinDocOpen, setIsJoinDocOpen] = useState(false);
    const user = useSelector((state) => state.auth?.user);
    const userId = user?.id;

    const fetchUserDocument = async () => {
        try {
            if (!userId) {
                console.warn("⚠️ userId is missing, skipping API call");
                return;
            }

            const res = await getUserDocumentApi(userId);
            const docs = Array.isArray(res) ? res : res?.data || [];
            setDocuments(docs);
        } catch (err) {
            console.error("❌ Error fetching documents:", err);
            setDocuments([]);
        }
    };

    const handleCreateDocument = async (title) => {
        try {
            const res = await createDocumentApi({ title });
            console.log("✅ Document created:", res);
            fetchUserDocument(); // refresh list
        } catch (err) {
            console.error("❌ Error creating document:", err);
        }
    };

    const handleJoinDocument = async (documentCode) => {
        try {
            const res = await joinDocumentApi({ documentCode });
            console.log("✅ Joined document:", res);
            fetchUserDocument();
        } catch (err) {
            console.log("❌ Error joining document:", err);
            alert("Invalid document code or failed to join.");
        }
    };

    useEffect(() => {
        fetchUserDocument();
    }, [userId]);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6 flex flex-col">
                {/* Header Section */}
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-indigo-700">My Documents</h1>
                    <button
                        onClick={() => setIsJoinDocOpen(true)}
                        className="px-5 py-2 bg-white text-indigo-600 border border-indigo-400 rounded-lg shadow hover:bg-indigo-50 transition-transform active:scale-95"
                    >
                        🔗 Join Document
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-5 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-transform active:scale-95"
                    >
                        + New Document
                    </button>
                </header>

                {/* Document Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.isArray(documents) && documents.length > 0 ? (
                        documents.map((doc) => (
                            <DocumentCard
                                key={doc.document_id}
                                title={doc.title}
                                role={doc.role}
                                document_id={doc.document_id}
                            />
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">No documents found.</p>
                    )}
                </div>

                {/* Modals */}
                <NewDocumentModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onCreate={handleCreateDocument}
                />
                <JoinDocumentModal
                    isOpen={isJoinDocOpen}
                    onClose={() => setIsJoinDocOpen(false)}
                    onJoin={handleJoinDocument}
                />
            </div>
        </>
    );
};

export default Dashboard;
