const mongooes = require("mongoose");

const documentSchema = new mongooes.Schema({
    owner_id: {
        type: mongooes.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    title: { type: String, required: true },
    document_code: { type: String, required: true },
});

const Document = mongooes.model("Document", documentSchema);
module.exports = Document;
