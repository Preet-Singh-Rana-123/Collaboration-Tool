const jwt = require("jsonwebtoken");

exports.authenticationToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "no token provided!" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            res.status(500).json({ message: "invalid token!" });
        }
        req.user = user;
        next();
    });
};
