const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Test Route
app.get("/api/test", (req, res) => {
  res.json({ message: "Aniicone Café backend is working!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`☕ Server running on port ${PORT}`);
});
