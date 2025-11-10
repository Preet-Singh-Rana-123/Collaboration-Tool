import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDocumentApi } from "../api/documentApi";

export const fetchDocument = createAsyncThunk("document/fetch", async (id) => {
    const res = await getDocumentApi(id);
    return res;
});

const documentSlice = createSlice({
    name: "document",
    initialState: {
        document_id: null,
        title: "",
        document_code: "",
        yjs_state: "",
        plain_text: "",
        role: "",
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDocument.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDocument.fulfilled, (state, action) => {
                state.document_id = action.payload.document._id;
                state.title = action.payload.document.title;
                state.document_code = action.payload.document.document_code;
                state.yjs_state = action.payload.document.yjs_state;
                state.plain_text = action.payload.document.plain_text;
                state.role = action.payload.document.role;
                state.loading = false;
            })
            .addCase(fetchDocument.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to load document";
            });
    },
});

export default documentSlice.reducer;
