import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  createUserService,
  getUserByEmailService,
  getUserByIdService,
} from "../models/userModel.js";

const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
  );
};

export const register = async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    if (!name || !email || !password || !confirmPassword) {
      return handleResponse(res, 400, "All fields are required");
    }

    if (!email.includes("@")) {
      return handleResponse(res, 400, "Please enter a valid email");
    }

    if (password.length < 6) {
      return handleResponse(res, 400, "Password must be at least 6 characters");
    }

    if (password !== confirmPassword) {
      return handleResponse(res, 400, "Passwords do not match");
    }

    const existingUser = await getUserByEmailService(email);

    if (existingUser) {
      return handleResponse(res, 400, "Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await createUserService(name, email, hashedPassword);

    const token = generateToken(newUser.id);

    return handleResponse(res, 201, "User registered successfully", {
      user: newUser,
      token,
    });
  } catch (err) {
    next(err);
  }
};

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

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return handleResponse(res, 401, "Invalid email or password");
    }

    const token = generateToken(user.id);

    return handleResponse(res, 200, "User logged in successfully", {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
      },
      token,
    });
  } catch (err) {
    next(err);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await getUserByIdService(req.user.id);

    if (!user) {
      return handleResponse(res, 404, "User not found");
    }

    return handleResponse(res, 200, "User profile fetched successfully", user);
  } catch (err) {
    next(err);
  }
};