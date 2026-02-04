import createHttpError from "http-errors";
import { User, Course } from "../config/db.js";

export const createCourses = async (req, res, next) => {
    try {
        const {
            title,
            description,
            category,
            level,
            language,
            duration,
            image,
            price,
        } = req.body;

        const newCourse = await Course.create({
            title,
            description,
            category,
            level,
            language,
            duration,
            image,
            price,
            creator: req.User._id,
        });

        res.status(201).json({
            success: true,
            message: "Course created successfully",
            newCourse,
        });
    } catch (err) {
        next(err);
    }
};

export const editCourses = async (req, res, next) => {
    try {
        const { courseId } = req.params;

        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            { $set: req.body },
            { new: true, runValidators: true },
        );

        if (!updatedCourse) {
            return next(createHttpError(404, "Course not found"));
        }

        res.status(200).json({
            success: true,
            message: "Course Updated Successfully",
            updatedCourse,
        });
    } catch (err) {
        next(err);
    }
};

export const getCourses = async (req, res, next) => {};

export const deleteCourses = async (req, res, next) => {};
