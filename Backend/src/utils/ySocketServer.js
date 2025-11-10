const { Server } = require("socket.io");
const Y = require("yjs");
const Content = require("../modles/content");
const Document = require("../modles/document");

const docs = new Map();

async function getYDoc(document_id) {
    // Reuse existing doc if cached
    let ydoc = docs.get(document_id.toString());
    if (ydoc) return ydoc;

    ydoc = new Y.Doc();
    docs.set(document_id.toString(), ydoc);

    // Load from DB if already saved
    const content = await Content.findOne({ document_id });
    if (content?.yjs_state) {
        try {
            const update = Buffer.from(content.yjs_state, "base64");
            Y.applyUpdate(ydoc, update);
        } catch (err) {
            console.error("❌ Failed to apply saved Yjs state:", err);
        }
    }

    // Auto-save changes (debounced)
    let saveTimeout;
    ydoc.on("update", () => {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(async () => {
            try {
                const fullstate = Y.encodeStateAsUpdate(ydoc);
                const base64 = Buffer.from(fullstate).toString("base64");

                await Content.findOneAndUpdate(
                    { document_id },
                    { yjs_state: base64, lastSynced: new Date() },
                    { upsert: true },
                );
            } catch (err) {
                console.error("❌ Error saving Y.Doc:", err);
            }
        }, 2000);
    });

    return ydoc;
}

function setupYSocketServer(server) {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        socket.on("join-document", async (document_code) => {
            try {
                const doc = await Document.findOne({ _id: document_code });
                if (!doc) {
                    console.warn(`⚠️ Document not found for code: ${document_code}`);
                    socket.emit("error", "Document not found");
                    return;
                }

                const document_id = doc._id; // actual ObjectId
                socket.join(document_id.toString());

                const ydoc = await getYDoc(document_id);

                const state = Y.encodeStateAsUpdate(ydoc);
                socket.emit("document-state", state);

                socket.on("update", (update) => {
                    try {
                        const binary = new Uint8Array(update);
                        Y.applyUpdate(ydoc, binary);
                        // Broadcast update to all other users in the same document room
                        socket.to(document_id.toString()).emit("update", update);
                    } catch (err) {
                        console.error("❌ Error applying Yjs update:", err);
                    }
                });

                socket.on("disconnect", () => { });
            } catch (err) {
                console.error("🔥 Error joining document:", err);
                socket.emit("error", "Server error while joining document");
            }
        });
    });

    return io;
}

module.exports = { setupYSocketServer };
