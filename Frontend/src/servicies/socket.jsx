import * as Y from "yjs";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

const socket = io("http://localhost:3000");

const ydoc = new Y.Doc();
const { document_id } = useSelector((state) => state.document);

socket.emit("join-document", document_id);

socket.on("document-state", (update) => {
    const binary = new Uint8Array(update);
    Y.applyUpdate(ydoc, binary);
});

socket.on("update", (update) => {
    const binary = new Uint8Array(update);
    Y.applyUpdate(ydoc, binary);
});

ydoc.on("update", (update) => {
    socket.emit("update", update);
});
