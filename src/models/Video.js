const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const videoSchema = new mongoose.Schema(
    {
        youtubeId: {
            type: String,
            required: true,
            trim: true,
        },
        mainUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);



module.exports = mongoose.model("Video", videoSchema);

