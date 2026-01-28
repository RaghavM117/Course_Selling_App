import express from "express";
import adminOnly from "../middlewares/adminOnly.js";
import auth from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { signInSchema, signUpSchema } from "../validation/auth.schema.js";
import { sendAuthTokens } from "../controllers/tokenController.js";
import { signUp, signIn } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", validate(signUpSchema), signUp, sendAuthTokens);

router.post("/signin", validate(signInSchema), signIn, sendAuthTokens);

router.use(auth);
router.use(adminOnly);

router.post("/courses", validate(), courses);

router.put("/addCourses", auth, validate(), addCourses);

router.delete("/deleteCourse", auth, adminOnly, deleteCourse);

router.get("/getCourses", auth, adminOnly, getCourses);

export default router;
