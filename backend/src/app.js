import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();

const app = express()

app.use(express.json({limit:"16kb"}));
app.use(urlencoded({extended: true, limit:"16kb"}));
app.use(express.static("public"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//cors config
app.use(cors({
    origin:process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173" || "http://localhost:5174",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedheaders: ["Content-Type", "Authorization"]
}));


//import routs
import notesRouter from "./routes/notes.routes.js";

app.use("/api/v1/notes", notesRouter);


if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../../frontend/dist")));
    app.use((req, res) => {
        res.sendFile(path.resolve(__dirname, "../../frontend/dist/index.html"));
    });
} else {
    app.get("/", (req, res) => {
        res.send("API is running....");
    });
} 

export default app;