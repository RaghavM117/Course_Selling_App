import createHttpError from "http-errors";
import { Course } from "../config/db.js";

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
            creator: req.user._id,
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

        const updatedCourse = await Course.findOneAndUpdate(
            { _id: courseId, creator: req.user._id },
            { $set: req.body },
            { new: true, runValidators: true },
        ).populate("creator", "name");

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

export const getCourses = async (req, res, next) => {
    try {
        const { courseId } = req.params;

        const readCourse = await Course.findById(courseId).populate(
            "creator",
            "name",
        );

        if (!readCourse) {
            return next(createHttpError(404, "Course not found"));
        }

        res.status(200).json({
            success: true,
            message: "Course Retrieved Successfully",
            readCourse,
        });
    } catch (err) {
        next(err);
    }
};

export const deleteCourses = async (req, res, next) => {
    try {
        const { courseId } = req.params;

        const deletingCourse = await Course.findOneAndDelete({
            _id: courseId,
            creator: req.user._id,
        }).populate("creator", "name");

        if (!deletingCourse) {
            return next(createHttpError(404, "Course not found"));
        }

        res.status(200).json({
            success: true,
            message: "Course Deleted Successfully",
            deletingCourse,
        });
    } catch (err) {
        next(err);
    }
};

export const getMyCourses = async (req, res, next) => {
    try {
        const userId = req.user._id;

        // Find only courses where creator matches the logged-in user
        const myCourses = await Course.find({ creator: userId }).populate(
            "creator",
            "name",
        );
        // Checking length because .find() always returns an array
        if (myCourses.length === 0) {
            return next(
                createHttpError(404, "No courses found for this teacher"),
            );
        }

        res.status(200).json({
            success: true,
            message: "Courses Retrieved Successfully",
            myCourses,
        });
    } catch (err) {
        next(err);
    }
};
