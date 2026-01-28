import jwt from "jsonwebtoken";
import createHttpError from "http-errors";

const ACCESS_SECRET = process.env.JWT_SECRET;

export const signAccessToken = (userId, role) => {
    if (!ACCESS_SECRET) {
        throw createHttpError(500, "Access Token Secret Missing");
    }
    return jwt.sign({ id: userId, role }, ACCESS_SECRET, { expiresIn: "2h" });
};
