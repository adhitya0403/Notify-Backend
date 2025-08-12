import express from 'express';
import {getAllTasks,createTask,getTaskById,deleteTask,updateTask} from '../controllers/taskController.js'
import {auth} from '../middleware/auth.js'


const taskRouter = express.Router();

taskRouter.get('/',auth, getAllTasks);
taskRouter.get('/:id',auth, getTaskById);
taskRouter.put('/:id',auth, updateTask);
taskRouter.post('/',auth, createTask);
taskRouter.delete('/:id',auth, deleteTask);

export default taskRouter;