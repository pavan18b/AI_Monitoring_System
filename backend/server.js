import express from "express";
import dotenv from "dotenv";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import examRoutes from "./routes/examRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import codingRoutes from "./routes/codingRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";
import { exec } from "child_process";
import { writeFileSync } from "fs";
import cors from "cors";
import examLogRoutes from "./routes/examLogRoutes.js";

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;

// ================= MIDDLEWARE =================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ 🔥 FINAL DYNAMIC CORS FIX (BEST)
const corsOptions = {
  origin: function (origin, callback) {
    // allow Postman / server-to-server
    if (!origin) return callback(null, true);

    // allow localhost + ALL vercel deployments
    if (
      origin.includes("localhost") ||
      origin.includes("vercel.app")
    ) {
      return callback(null, true);
    }

    console.log("❌ Blocked by CORS:", origin);
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

// APPLY CORS
app.use(cors(corsOptions));

// HANDLE PREFLIGHT REQUESTS
app.options("*", cors(corsOptions));

// ================= CODE EXECUTION =================
app.post("/run-python", (req, res) => {
  const { code } = req.body;
  writeFileSync("script.py", code);

  exec("python script.py", (error, stdout, stderr) => {
    if (error) return res.send(`Error: ${stderr}`);
    res.send(stdout);
  });
});

app.post("/run-javascript", (req, res) => {
  const { code } = req.body;
  writeFileSync("script.js", code);

  exec("node script.js", (error, stdout, stderr) => {
    if (error) return res.send(`Error: ${stderr}`);
    res.send(stdout);
  });
});

app.post("/run-java", (req, res) => {
  const { code } = req.body;
  writeFileSync("Main.java", code);

  exec("javac Main.java && java Main", (error, stdout, stderr) => {
    if (error) return res.send(`Error: ${stderr}`);
    res.send(stdout);
  });
});

// ================= ROUTES =================
app.use("/api/users", userRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/coding", codingRoutes);
app.use("/api/exam-logs", examLogRoutes);

// ================= ROOT =================
app.get("/", (req, res) => {
  res.json({ message: "API is running 🚀" });
});

// ================= ERROR HANDLING =================
app.use(notFound);
app.use(errorHandler);

// ================= SERVER =================
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log("JWT Secret:", process.env.JWT_SECRET);
});