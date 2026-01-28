import express from "express";
import cors from "cors";
import logger from "./middlewares/logger.js";
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandling.js";
import { adminRouter } from "./routes/admin.js";
import { courseRouter } from "./routes/course.js";
import { userRouter } from "./routes/user.js";
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());

app.use(logger);

// routes
app.use("/admin", adminRouter);
app.use("/course", courseRouter);
app.use("/user", userRouter);

app.use(notFound);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is being listened on Port: ${PORT}`);
});
