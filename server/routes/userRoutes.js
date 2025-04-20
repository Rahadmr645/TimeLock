import express from 'express'
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv';
dotenv.config();
import JWT from 'jsonwebtoken';

const SECRETE_KEY = process.env.SECRETE_KEY;

const router = express.Router();

// 01: create routes
router.post('/create', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) return res.status(401).json({ message: "you must be fill all the input above" });

        const isExist = await User.findOne({ email });
        if (isExist) return res.status(400).json({ message: "User already exist" });


        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashPass,
        });

        const token = JWT.sign({ name: newUser.name, email: newUser.email, id: newUser._id }, SECRETE_KEY, { expiresIn: "1d" })
        await newUser.save();
        res.status(200).json({ message: "User craete successfully", user: newUser, token: token });
    } catch (error) {
        res.status(500).json({ message: "faild to create user ", error: error.message })
    }
})




// 02: Login user 
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "please inter all the input" });

        const isExist = await User.findOne({ email });

        if (!isExist) return res.status(403).json({ message: "user not exist" });

        const comparePass = await bcrypt.compare(password, isExist.password);

        if (!comparePass) return res.status(404).json({ message: "UnAuthorised credintial" });
        const token = JWT.sign({ name: isExist.name, email: isExist.email, id: isExist._id }, SECRETE_KEY, { expiresIn: "1d" })
        res.status(200).json({ message: `Hey ${isExist.name}  Dear you are well come `, token: token })
    } catch (error) {
        res.status(500).json({ message: "Enternal problem ", error: error.message })
    }

})


export default router;