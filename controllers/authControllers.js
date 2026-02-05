import createHttpError from "http-errors";
import { User } from "../config/db.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({
            $or: [{ email }, { name: username }],
        });

        if (existingUser) {
            return next(createHttpError(409, "User already exists"));
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.Create({
            name: username,
            email,
            password: hashedPassword,
        });

        req.user = user; // stored or attaching mongoDB user
        req.authAction = "signUp";
        next();
    } catch (err) {
        next(err);
    }
};

export const signIn = async (req, res, next) => {
    try {
        const { identifiers, password } = req.body;

        const user = await User.findOne({
            $or: [{ email: identifiers }, { name: identifiers }],
        }).select("+password");

        if (!user) {
            return next(createHttpError(404, "User not found"));
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return next(createHttpError(401, "Invalid credentials"));
        }

        req.user = user; // stored or attaching mongoDB user
        req.authAction = "signIn";
        next();
    } catch (err) {
        next(err);
    }
};
