const mongoose = require("mongoose");

const TokensSchema = new mongoose.Schema({
    email: { type: String, sparse: true },
    token: String,
    status: Boolean,
    expireAt: {
        type: Date,
        default: Date.now,
        expires: '10m',
    }
    // createdAt: { type: Date, expires: '1m', default: Date.now }
});

const Token = mongoose.model("tokens", TokensSchema);
module.exports = Token;
