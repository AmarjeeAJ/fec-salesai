const express = require("express");
const cors = require("cors");

const leadRoutes = require("./routes/leads");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // replaces body-parser (built into Express)

// Routes
app.use("/api/leads", leadRoutes);

// Health check route (optional, for debugging)
app.get("/", (req, res) => {
  res.send("Backend API is running...");
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));
