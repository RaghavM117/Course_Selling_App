import createHttpError from "http-errors";

export const statusCheck = (req, res, next) => {
    if (req.user.status !== "active") {
        return next(
            createHttpError(
                403,
                `This action cannot be done because Your Account(${req.user.name}) has been blocked`,
            ),
        );
    } else {
        next();
    }
};
