import JWT from 'jsonwebtoken'
import User from '../models/userModel.js'
import dotenv from 'dotenv'
dotenv.config();

const SECRETE_KEY = process.env.SECRETE_KEY;

const protect = async (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Not authorized, no token" });

    try {
        const decoded = JWT.verify(token, SECRETE_KEY);
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (error) {
        res.status(401).json({ message: "Not authorized, token faild" })
    }
}

export default protect;