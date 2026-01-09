const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const restrictedUserSchema = new mongoose.Schema(
    {
        restrictedUserName: {
            type: String,
            required: true,
            trim: true,
        },
        pin: {
            type: String,
            required: true,
            select: false, // This slect hide this value when we fetch user data
            minlength: 4,
            maxlength: 6,
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

restrictedUserSchema.pre("save", async function(next) {
  if (this.isModified("pin")) {
    const salt = await bcrypt.genSalt(10);
    this.pin = await bcrypt.hash(this.pin, salt);
  }
  next();
});


restrictedUserSchema.methods.comparePin = async function (enteredPin) {
  return await bcrypt.compare(enteredPin, this.pin);
};

module.exports = mongoose.model("RestrictedUser", restrictedUserSchema);
