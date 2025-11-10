const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
    document_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "documents",
        required: true,
    },
    yjs_state: { type: String },
    plain_text: { type: String },
    lastSynced: { type: Date },
});

const Content = mongoose.model("Content", contentSchema);
module.exports = Content;
