import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { createUserService, getUserByEmailService, getUserById } from "../models/userModel.js"

const handleResponse = (res, status, message, data = null) => {

    res.status(status).json({
        status,
        message,
        data,
    });
}

const generateToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    )
}

export const register = async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;

    try {
        if (!name || !email || !password || !confirmPassword) {
            return handleResponse(res, 400, "All fields are required");
        }

        if (password !== confirmPassword) {
            return handleResponse(res, 400, "Passwords do not match");
        }

        if (password.length < 6) {
            return handleResponse(res, 400, "Password must be at least 6 characters");
        }
        const existingUser = await getUserByEmail(user.email);
        if (existingUser) {
            return handleResponse(res, 400, "email already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = createUserService(name, email, hashedPassword);
        const token = generateToken(newUser.id)

        handleResponse(res, 201, "user registed successfully", {
            user: newUser,
            token
        });


    }
    catch (err) {
        next(err);
    }
}

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return handleResponse(res, 400, "Email and password are required");
        }

        const user = await getUserByEmailService(email);

        if (!user) {
            return handleResponse(res, 401, "Invalid email or password");
        }
        const isPasswordCorrect = bcrypt.compare(password, user.hashedPassword)

        if (!isPasswordCorrect) {
            handleResponse(res, 401, "invalid email or password")
        }

        const token = generateToken(user.id)

        handleResponse(res, 200, "user logged in successfully", {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,

            },
            token,
        })

    } catch (err) {
        next(err)
    }

}

export const getMe = async (req, res, next) => {
    try {
        const user = await getUserById(req.userId);

        if (!user) {
            return handleResponse(res, 404, "user not found")
        }
        handleResponse(res, 200, "User profile fetched successfully")
    } catch (err) {
        next(err)
    }
}