const {verifyToken} = require("./../helpers/jwt_functions");

module.exports = function customer(req,res,next) {
    const token = req.headers.authorization;
    const payload = verifyToken(token);
    
    if (!payload || payload.userType != "customer") {
        return res.status(400).send("please provide customer token");
    }
    req.auth = payload;
    next();
}