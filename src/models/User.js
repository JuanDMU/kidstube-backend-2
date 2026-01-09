const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
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
        password: {
            type: String,
            required: true,
            select: false, // This slect hide this value when we fetch user data
            trim: true,
        },
        birthDate: {
            type: Date,
            required: true,
            
        },
        status: {
            type: String,
            enum: ["active", "pending"],
            default: "pending",
            trim: true,
        },
    },
    { timestamps: true }
);


userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  if (this.isModified("pin")) {
    const salt = await bcrypt.genSalt(10); //genSalt is used to generate a random string to make the hash more secure
    this.pin = await bcrypt.hash(this.pin, salt);
  }

  next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.comparePin = async function (enteredPin) {
  return await bcrypt.compare(enteredPin, this.pin);
};

module.exports = mongoose.model("User", userSchema);

