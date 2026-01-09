const { registerUser, loginUser } = require("../services/authService");

exports.register = async (req, res) => {
  try {
    await registerUser(req.body);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (
      error.message === "All fields are required" ||
      error.message === "Email already in use"
    ) {
      return res.status(400).json({ error: error.message });
    }

    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await loginUser(email, password);
    res.status(200).json({ token });
  } catch (error) {
    if (
      error.message === "Email and password are required" ||
      error.message === "Invalid credentials"
    ) {
      return res.status(400).json({ error: error.message });
    }

    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};