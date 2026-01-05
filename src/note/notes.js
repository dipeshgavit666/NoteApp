import {create} from "zustand";

export const useNotes = create((set) => ({
    notes: [],
    setNotes: (notes) => set({notes}),
    createNote: async(newNote) => {
        if(!newNote.title || !newNote.description){
            return {success:false, message:"Please fill in all fields."}
        }
        const res = await fetch("/api/v1/notes", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(newNote)
        })
        const data = await res.json();
        set((state) => ({notes:[...state.notes, data.data]}));
        return {success: true, message: "Note created successfully."}
    }
}));