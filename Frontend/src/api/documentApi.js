import api from "./axios";

export const getDocumentApi = async (id) => {
    const res = await api.get(`/api/document/${id}`);
    return res.data;
};

export const getUserDocumentApi = async (userId) => {
    const res = await api.get("/api/dashboard/document", {
        params: { userId },
    });
    return res.data;
};

export const createDocumentApi = async ({ title }) => {
    const res = await api.post("/api/document/create", { title });
    return res.data;
};

export const joinDocumentApi = async ({ documentCode }) => {
    const res = await api.post("/api/document/join", { documentCode });
    return res.data;
};
