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
    },

    fetchNotes: async() => {
        try {
            const res = await fetch("/api/v1/notes");
            const data = await res.json();

            set({notes: Array.isArray(data.data.notes) ? data.data.notes : []});
        } catch (error) {
            console.error("Error fetching notes:", error);
            set({notes: []});
        }
    },

    deleteNote: async(nid) => {
        try {
            const res = await fetch("api/v1/notes/${nid}", {
                method: "DELETE",
            });
            const data = await res.json();
            set((state) => ({
                notes: state.notes.filter((note) => note._id !== nid)
            }));
            return {success: true, message: data.message}
        } catch (error) {
             console.error("Error deleting notes:", error);
        }
    }
}));