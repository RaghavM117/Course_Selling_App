import express from "express";
import adminOnly from "../middlewares/adminOnly.js";
import auth from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { signInSchema, signUpSchema } from "../validation/auth.schema.js";
import { sendAuthTokens } from "../controllers/tokenController.js";
import { signUp, signIn } from "../controllers/authController.js";
import {
    postCourseSchema,
    updateCourseSchema,
} from "../validation/courses.schema.js";
import { createCourses } from "../controllers/adminControllers.js";

const router = express.Router();

router.post("/signup", validate(signUpSchema), signUp, sendAuthTokens);

router.post("/signin", validate(signInSchema), signIn, sendAuthTokens);

router.use(auth);
router.use(adminOnly);

router.post("/courses", validate(postCourseSchema), createCourses);

router.patch(
    "/course/:courseId",
    validate(courseIdParamsSchema, "params"),
    validate(updateCourseSchema),
    editCourses,
);

router.delete("/deleteCourse", adminOnly, deleteCourse);

router.get("/getCourses", adminOnly, getCourses);

export default router;
