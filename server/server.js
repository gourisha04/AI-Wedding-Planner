require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const weddingRoutes = require("./routes/weddingRoutes");
const eventRoutes = require("./routes/eventRoutes");
const aiRoutes = require("./routes/aiRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Serve uploaded files as static assets
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/weddings", weddingRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/uploads", uploadRoutes);

app.get("/", (req, res) => {
  res.send("AI Wedding Planner API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});