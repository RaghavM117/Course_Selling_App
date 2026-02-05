import createHttpError from "http-errors";
import { Course, Purchase } from "../config/db.js";

export const getAllCourses = async (req, res, next) => {
    try {
        const allCourses = await Course.find().populate("creator", "name");

        res.status(200).json({
            success: true,
            message: "All courses retrieved successfully",
            allCourses,
        });
    } catch (err) {
        next(err);
    }
};

export const getCourse = async (req, res, next) => {
    const { courseId } = req.params;

    const getSingleCourse = await Course.findById(courseId).populate(
        "creator",
        "name",
    );

    if (!getSingleCourse) {
        return next(createHttpError(404, "Course Not Found"));
    }

    res.status(200).json({
        success: true,
        message: "Course retrieved successfully",
        getSingleCourse,
    });
};

export const purchaseCourse = async (req, res, next) => {
    try {
        const { courseId } = req.params;
        const userId = req.user._id;

        const course = await Course.findById(courseId).populate(
            "creator",
            "name",
        );
        if (!course) return next(createHttpError(404, "Course Not Found"));

        const existingPurchase = await Purchase.findById({
            user: userId,
            course: courseId,
        });
        if (!existingPurchase)
            return next(createHttpError(400, "Course already purchased"));

        const newPurchase = await Purchase.create({
            user: userId,
            course: courseId,
            creator: Course.creator, // Get this from the Course models
            priceAtPurchase: Course.price,
            status: "completed",
        });
        res.status(201).json({
            success: true,
            message: "Course purchased successfully",
            newPurchase,
        });
    } catch (err) {
        next(err);
    }
};

export const getMyCourses = async (req, res, next) => {
    try {
        const userId = req.user._id;

        const myCourses = await Purchase.find({ user: userId }).populate(
            "course",
            "title description price",
        );

        res.status(200).json({
            success: true,
            message: "My courses retrieved successfully",
            myCourses,
        });
    } catch (err) {
        next(err);
    }
};
