import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    category: {
        type: Number,
        enum: [1, 2, 3],
        default: 2
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    allowedApps: {
        type: [String],
        default: []
    },
    wasSkipped: {
        type: Boolean,
        default: false
    },
    actualStartTime: {
        type: Date
    },
    actuEndTime: {
        type: Date
    }
},
    {
        timeStamps: true // adds createdA and updateAt
    }
);

const Task = mongoose.model("task", taskSchema);

export default Task;