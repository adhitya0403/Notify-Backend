import Note from '../models/Note.js'

export async function getAllNotes(req, res) {
    try{
        const notes = await Note.find({userId:req.user.id}).sort({createdAt: -1});
        res.status(200).json(notes)
    }
    catch{
        res.status(500).json({message:"internal sever error"});
    }
}

export async function getNoteById(req, res) {
    const { id } = req.params;
    try {
        const note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(note);
    }
    catch {
        res.status(500).json({ message: "internal server error" });
    }
}

export async function createNote(req, res) {
    try{
        const { title, content } = req.body;
        const newNote = new Note({ title, content, userId:req.user.id});
        await newNote.save();
        res.status(201).json({message: "Note created successfully",note: newNote});
    }
    catch{
        res.status(500).json({message:"internal server error"});
    }
}

export async function updateNote(req, res) {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        const updatedNote = await Note.findByIdAndUpdate(id, { title, content }, { new: true });
        if (!updatedNote) { 
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({ message: "Note updated successfully", note: updatedNote });
    }
    catch {
        res.status(500).json({ message: "internal server error" });
    }
}

export async function deleteNote(req, res) {
    const {id} = req.params;
    try{
        const deleteNote = await Note.findByIdAndDelete(id);
        if (!deleteNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({ message: "Note deleted successfully", note: deleteNote });
    }
    catch {
        res.status(500).json({ message: "internal server error" });     
    }
}



