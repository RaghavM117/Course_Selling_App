import "colors"; // This adds the color methods to all strings

const logger = (req, res, next) => {
    const methodColors = {
        GET: "green",
        PUT: "blue",
        POST: "yellow",
        DELETE: "red",
    };

    const color = methodColors[req.method] || "white";

    // Standard practice is to log the method and URL clearly
    const logMessage = `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`;

    console.log(logMessage[color]);

    next();
};

export default logger;
