import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import mentorRoutes from "./routes/mentorRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

// Root test route
app.get("/", (req, res) => {
  return res.status(200).json({
    message: "I am from backend server",
    success: true,
  });
});

// Routes
app.use("/api/mentors", mentorRoutes);
app.use("/api/students", studentRoutes);

// Start server only after DB is connected
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error starting server:", error.message);
    process.exit(1);
  }
};

startServer();
