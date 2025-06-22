import jwt from "jsonwebtoken"
import User from "../models/userModel.js"
import dotenv from "dotenv"

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const authMiddleware = async (req,res,next) => {
    // GRAB THE BEARER TOKEN FROM THE AUTHORIZATION HEADER

    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({
            success: false,
            message: "Not Authorized ; token missing"
        })
    }

    const token = authHeader.split(' ')[1]

    // VERIFY AND ATTACK THE USER OBJECT 
    try {
        const payload = jwt.verify(token, JWT_SECRET)
        const user = await User.findById(payload.id).select("-password")

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User Not Found"
            })
        }

        req.user = user
        next()
    } catch (error) {
        console.log("Jwt verification Failed ", error)
        return res.status(401).json({
            success: false,
            message: "Invalid token or token is expire"
        })
    }
}