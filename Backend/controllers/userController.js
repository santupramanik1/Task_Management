import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator"
import dotenv from "dotenv"

dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const TOKEN_EXPIRE = "24h";

const createToken = userId => {
    return jwt.sign({
            id: userId,
        },
        JWT_SECRET, {
            expiresIn: TOKEN_EXPIRE,
        }
    );
};

// REGISTER FUNCTION
export const registerUser = async (req, res) => {
    const {
        name,
        email,
        password
    } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All Feild are Require",
        });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({
            success: false,
            message: "Invalid Email",
        });
    }

    if (password.length < 8) {
        return res.status(400).json({
            success: false,
            message: "Password  must be atleast 8 character",
        });
    }

    try {
        if (
            await User.findOne({
                email,
            })
        ) {
            return res.status(409).json({
                success: false,
                message: "Email Already Exists",
            });
        }

        // password hashing
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            name,
            email,
            password: hashPassword,
        });

        const token = createToken(user._id);

        return res.status(201).json({
            success: true,
            token,
            message: "User registered successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

// LOGIN FUNCTION

export const loginUser = async (req, res) => {
    const {
        password,
        email
    } = req.body;
    if (!password || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password Required",
        });
    }

    try {
        const user = await User.findOne({
            email
        });

        if (!user) {
            return res.status(401).json({
                //401 -unauthorized user
                success: false,
                message: "Invalid credentials",
            });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({
                //401 -unauthorized user
                success: false,
                message: "Password didn't match",
            });
        }

        const token = createToken(user._id)
        return res.status(201).json({
            success: true,
            token,
            message: "User Login successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

// GET CURRENT USER 

export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("name email")
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User Not Found"
            })
        }

        return res.json({
            success: true,
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
}

// UPDATE USER PROFILE

export const updateUserProfile = async (req, res) => {
    const {
        name,
        email
    } = req.body
    if (!name || !email || !validator.isEmail(email)) {
        return res.status(400).json({
            success: false,
            message: "Valid name and email is required"
        })
    }
    try {
        const userExists = await User.findOne({
            email,
            _id: {
                $ne: req.user.id
            }
        })
        if (userExists) {
            return res.status(409).json({
                success: false,
                message: "Email Already Exists Used by another Account"
            })
        }

        const user = await User.findByIdAndUpdate(req.user.id, {
            name,
            email
        }, {
            new: true,
            runValidators: true,
            select: "name email"
        })

        return res.json({
            success: true,
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
}

// CHANGE PASSWORD FUNCTION 

export const updatePassword = async (req, res) => {
    const {
        currentPassword,
        newPassword
    } = req.body
    if (!currentPassword || !newPassword || newPassword.length < 8) {
        return res.status(400).json({
            success: false,
            message: "Invalid Password Or Password is too short"
        })
    }

    try {
        const user = await User.findById(req.user.id).select("password")

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            })
        }

        //check the current password is correct or Not
        const passwordMatch = await bcrypt.hash(currentPassword, user.password)
        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Current Password is Incorrect"
            })
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt)
        await user.save()

        return res.json({
            success: true,
            message: "Password changed succesfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
}