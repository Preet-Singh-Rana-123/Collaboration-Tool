import api from "./axios";

export const getUserApi = async () => {
    const res = await api.get("/api/user/profile");
    return res.data;
};

export const updateUserApi = async (form) => {
    const res = await api.put("/api/user/profile", form);
    return res.data;
};
