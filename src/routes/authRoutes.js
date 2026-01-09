const express = require("express");
const User = require("../models/User");
const RestrictedUser = require("../models/RestrictedUser");

const { register, login } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;