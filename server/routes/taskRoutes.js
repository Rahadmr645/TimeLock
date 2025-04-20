import express from 'express'
import protect from '../middleware/authToken.js';
import Task from '../models/taskModels.js';
const router = express.Router();

// 01: create task router
router.post('/create', protect, async (req, res) => {
    try {

        const { title,startTime,endTime } = req.body;

        if (!title) return res.status(400).json({ message: "please fill all the input" });

        const newTask = new Task({
            title,
            userId: req.user.id,
            startTime,
            endTime
        
        });

        const saveTask = await newTask.save();
        res.status(200).json({ message: `task create success full well done ${req.user.name}`,task: saveTask });
    } catch (error) {
        res.status(500).json({ message: "internal error", error: error.message })
    }
})

export default router;