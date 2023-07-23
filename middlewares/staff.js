const {verifyToken} = require("./../helpers/jwt_functions");

module.exports = function staff(req,res,next) {
    const token = req.headers.authorization;
    const payload = verifyToken(token);
    if (!payload || payload.userType != "staff") {
        return res.status(400).send("please provide staff token");
    }
    req.auth = payload;
    next();
}