const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;

    if (!token) {
        return res.status(401).json({
            message: "Access Denied"
        });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET || "fashion-secret");

        req.user = verified;

        next();

    } catch (error) {
        res.status(400).json({
            message: "Invalid Token"
        });
    }
};

module.exports = authMiddleware;