import express from "express";
import adminOnly from "../middlewares/adminOnly.js";
import auth from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { signInSchema, signUpSchema, userSSchema } from "../validation/auth.schema.js";
import { sendAuthTokens } from "../controllers/tokenController.js";
import { signUp, signIn } from "../controllers/authControllers.js";
import {
    postCourseSchema,
    updateCourseSchema,
    courseIdParamSchema,
} from "../validation/courses.schema.js";
import {
    createCourses,
    editCourses,
    getCourses,
    getMyCourses,
    deleteCourses,
} from "../controllers/adminControllers.js";
import { changePassword } from "../controllers/userControllers.js";

const router = express.Router();

router.post("/signup", validate(signUpSchema), signUp, sendAuthTokens);

router.post("/signin", validate(signInSchema), signIn, sendAuthTokens);

router.patch('/changePassword', auth, validate(userSSchema), changePassword);

router.use(auth);
router.use(adminOnly);

router.post("/courses", validate(postCourseSchema), createCourses);

router.route("courses/:courseId")
    .all(validate(courseIdParamSchema, "params"))
    .get(getCourses)
    .patch(validate(updateCourseSchema),editCourses)
    .delete(deleteCourses);

router.get("/myCourses", getMyCourses);

export default router;
