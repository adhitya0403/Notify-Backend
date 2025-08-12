import Task from "../models/Task.js";

export async function getAllTasks(req, res) {
    try {
        const tasks = await Task.find({userId:req.user.id}).sort({isFinished:1});
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
}

export async function getTaskById(req, res) {
    const {id} = req.params;
    try {
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
}

export async function createTask(req, res) {
    try{
        const {content,isFinished} = req.body;
        const newTask = new Task({userId:req.user.id,content,isFinished});
        await newTask.save();
        res.status(201).json({message: "Task created successfully"});
    }
    catch{
        res.status(500).json({message:"internal server error"});
    }
}

export async function updateTask(req, res) {
    const { id } = req.params;
    const {content,isFinished} = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(id, {content,isFinished});
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task updated successfully"});
    }
    catch {
        res.status(500).json({ message: "internal server error" });
    }
}

export async function deleteTask(req, res) {
    const {id} = req.params;
    try{
        const deleteTask = await Task.findByIdAndDelete(id);
        if (!deleteTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted successfully"});
    }
    catch {
        res.status(500).json({ message: "internal server error" });     
    }
}