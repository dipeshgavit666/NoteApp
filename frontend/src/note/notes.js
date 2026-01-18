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
        set((state) => ({notes:[...state.notes, data.data.newNote]}));
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

    updateNote: async(nid, updatedNote) => {
        try {
            const res = await fetch(`/api/v1/notes/${nid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedNote)
            });
            const data = await res.json();

            console.log("Update response:", data);

            if(!res.ok || !data.success) {
                return {success: false, message: data.message || "Failed to update note"};
            }
            
            set((state) => ({
                notes: state.notes.map((note) =>
                note._id === nid ? data.data.updatedNote : note
            )
        }));

            
            return {success: true, message: data.message || "Note updated successfully"};
        } catch (error) {
            console.error("Error updating note:", error);
            return {success: false, message: "Failed to update note"};
        }
    },

    deleteNote: async(nid) => {
        try {
            const res = await fetch(`/api/v1/notes/${nid}`, {
                method: "DELETE",
            });
            const data = await res.json();
            
            if(!data.success) {
                return {success: false, message: data.message};
            }
            
            set((state) => ({
                notes: state.notes.filter((note) => note._id !== nid)
            }));
            
            return {success: true, message: data.message || "Note deleted successfully"};
        } catch (error) {
            console.error("Error deleting note:", error);
            return {success: false, message: "Failed to delete note"};
        }
    }
}));