import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import studentRoutes from "./routes/student.js";
import teacherRoutes from "./routes/teacher.js";
import fileUpload from "express-fileupload";
import connectCloudinary from "./config/cloudinary.js";
import cors from "cors";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin : "http://localhost:5173",
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/student", studentRoutes);
app.use("/api/v1/teacher", teacherRoutes);

connectDB();

connectCloudinary();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
