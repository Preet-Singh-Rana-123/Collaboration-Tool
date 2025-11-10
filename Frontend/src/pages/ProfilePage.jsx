import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getUserApi, updateUserApi } from "../api/userApi";
import EditProfileModal from "../components/EditProfileModal";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Fetch user on mount
    const getUser = async () => {
        try {
            const res = await getUserApi();
            setUser(res.user);
        } catch (err) {
            console.error("❌ Failed to fetch user:", err);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    // Handle profile update
    const handleUpdate = async (updatedData) => {
        try {
            const res = await updateUserApi(updatedData);
            setUser(res.user); // update UI instantly
            setShowModal(false); // close modal
            console.log("✅ Profile updated successfully!");
        } catch (err) {
            console.error("❌ Failed to update profile:", err);
        }
    };

    if (!user) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex justify-center items-center">
                    <p className="text-indigo-600 text-lg">Loading profile...</p>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col items-center py-10">
                <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8 border border-indigo-200">
                    <h2 className="text-3xl font-semibold text-center text-indigo-700 mb-6">
                        Your Profile
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="text-lg font-medium text-gray-800">{user.email}</p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Name</p>
                            <p className="text-lg font-medium text-gray-800">{user.name}</p>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowModal(true)}
                        className="w-full mt-6 bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition-transform active:scale-95"
                    >
                        Edit Profile
                    </button>
                </div>
            </div>

            {showModal && (
                <EditProfileModal
                    user={user}
                    onClose={() => setShowModal(false)}
                    onSave={handleUpdate}
                />
            )}
        </>
    );
};

export default ProfilePage;
