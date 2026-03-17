require express from "express";
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    console.log("Hashed password:", hash);
    res.json({ message: "User created successfully" });
});

router.post("/login", (req, res) => {
    console.log(req.body);
    res.json({ message: "User logged in successfully" });
});

module.exports = router;
