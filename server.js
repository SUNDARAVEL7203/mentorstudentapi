import dotenv from "dotenv";
import express from 'express';
import connectDB from "./config/db.js";
import mentorRoutes from "./routes/mentorRoutes.js"
import studentRoutes from "./routes/studentRoutes.js"

dotenv.config();
const app = express();
app.use(express.json());

   connectDB();
app.get("/", (req, res) => {
    return res.status(200).json({
        message: "I am from backend server",
        success: true
    });
});

 const PORT = process.env.PORT || 5000;

 app.use('/api/mentors', mentorRoutes);
app.use('/api/students', studentRoutes);

app.listen(PORT, () => {
 
    console.log(`Server is running on port ${PORT}`);
});