import {connectDB} from "./config/db.js";
import app from "./app.js";
const port = process.env.PORT || 3000;

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`NoteApp is running on http://localhost:${port}`);
        })
    })
    .catch((error) => {
        console.error("mongoDb connection error from indexjs", error);
        
    })