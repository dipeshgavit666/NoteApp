import mongoose, { Schema } from "mongoose";

const noteSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,

    },
    description: {
        type: String,
        trim: true,
    },
    image: {
        type: String,
        default: ""
    }
}, {timestamps: true});

const Note = mongoose.model("Note", noteSchema);

export default Note;