import express from "express";
import auth from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { signInSchema, signUpSchema, userSSchema } from "../validation/auth.schema.js";
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
import { changePassword } from "../controllers/userControllers.js";

const router = express.Router();

router.post("/signup", validate(signUpSchema), signUp, sendAuthTokens);

router.post("/signin", validate(signInSchema), signIn, sendAuthTokens);

router.patch('/changePassword', auth, validate(userSSchema), changePassword);


router.use(auth);

router.get("/allCourses", getAllCourses);

router.route("courses/:courseId")
    .all(validate(courseIdParamSchema, "params"))
    .get(getCourse)
    .post(validate(purchaseCourseSchema), purchaseCourse);

router.get("/myCourses", getMyCourses);

export default router;
