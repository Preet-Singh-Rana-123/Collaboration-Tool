import { useState } from "react";
import { postRegisterApi } from "../api/authApi";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted with:", { avatar });
        // You can handle form submission here (send to backend, etc.)
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-300">
                <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-xl p-8 w-full max-w-md">
                    <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
                        Create Your Account
                    </h2>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {/* Name */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-semibold text-gray-700 mb-1"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition duration-200"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-gray-700 mb-1"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="johndoe@xyz.com"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition duration-200"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-semibold text-gray-700 mb-1"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter strong password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition duration-200"
                            />
                        </div>

                        {/* Avatar Section */}
                        <div>
                            <label
                                htmlFor="avatar"
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                Select Avatar
                            </label>

                            <div className="flex items-center gap-4">
                                {/* Avatar Preview */}
                                {avatarPreview ? (
                                    <img
                                        src={avatarPreview}
                                        alt="Avatar Preview"
                                        className="w-16 h-16 rounded-full border-2 border-indigo-400 object-cover shadow-md"
                                    />
                                ) : (
                                    <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs">
                                        No image
                                    </div>
                                )}

                                {/* File Input */}
                                <input
                                    type="file"
                                    id="avatar"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                    className="w-full px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition duration-200"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-2 mt-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 active:scale-95 transition-transform duration-150"
                        >
                            Register
                        </button>
                    </form>

                    {/* Small link */}
                    <p className="text-center text-sm text-gray-600 mt-4">
                        Already have an account?{" "}
                        <a
                            href="#"
                            className="text-indigo-600 hover:underline hover:text-indigo-800"
                        >
                            Log in
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Register;
