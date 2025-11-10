const mongoose = require("mongoose");

const colaboratorSchema = new mongoose.Schema({
    document_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "documents",
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    role: { type: String, enum: ["owner", "viewer", "editor"], required: true },
});

const Collaborator = mongoose.model("Collaborator", colaboratorSchema);
module.exports = Collaborator;
