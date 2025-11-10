import api from "./axios";

export const postLoginApi = (formData) => {
    const res = api.post("/api/auth/login", formData);
    return res;
};

export const postRegisterApi = (formData) => {
    const res = api.post("/api/auth/register", formData);
    return res;
};
