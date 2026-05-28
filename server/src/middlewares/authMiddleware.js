import jwt from "jsonwebtoken";

const authMiddleWare = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            status: 401,
            message: "no token provided",
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            id: decoded.id,
        };
        next();
    } catch (err) {
        return res.status(401).json({
            status: 401,
            message: "invalid or expired token"
        })
    }

}
export default authMiddleWare;