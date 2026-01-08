const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const playlistSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        videos: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video",
            default: []
        }],
        restrictedUsers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "RestrictedUser",
            default: []
        }],
        mainUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);



module.exports = mongoose.model("Playlist", playlistSchema);

