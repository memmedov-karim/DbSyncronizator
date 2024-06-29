const mongoose = require("mongoose");
const { Schema } = mongoose;

const syncronerSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        maxLength: [20, "Password cannot exceed 20 characters."],
        minLength: [6, "Password must be at least 6 characters long."]
    }
}, { timestamps: true });

const Syncroner = mongoose.model("syncroner", syncronerSchema);

module.exports = Syncroner;
