import express from "express";
import auth from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { signInSchema, signUpSchema } from "../validation/auth.schema.js";
import { sendAuthTokens } from "../controllers/tokenController.js";
import { signUp, signIn } from "../controllers/authControllers.js";
import {
    getCourse,
    getAllCourses,
    getMyCourses,
    purchaseCourse,
} from "../controllers/userControllers.js";
import { courseIdParamSchema } from "../validation/courses.schema.js";
import { purchaseCourseSchema } from "../validation/purchaseCourse.schema.js";

const router = express.Router();

router.post("/signup", validate(signUpSchema), signUp, sendAuthTokens);

router.post("/signin", validate(signInSchema), signIn, sendAuthTokens);

router.use(auth);

router.get("/allCourses", getAllCourses);

router.get(
    "/singleCourse/:courseId",
    validate(courseIdParamSchema, "params"),
    getCourse,
);

router.post(
    "/purchaseCourse/:courseId",
    validate(courseIdParamSchema, "params"),
    validate(purchaseCourseSchema),
    purchaseCourse,
);

router.get("/myCourses", getMyCourses);

export default router;
