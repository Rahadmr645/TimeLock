import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        uniqe: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model("user", userSchema);

export default User;