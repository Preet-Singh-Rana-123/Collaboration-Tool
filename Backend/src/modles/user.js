const mongooes = require("mongoose");

const userSchema = new mongooes.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    avtar_url: { typr: String },
});

const User = mongooes.model("User", userSchema);
module.exports = User;
