const {verifyToken} = require("./../helpers/jwt_functions");

module.exports = function admin(req,res,next) {
    const token = req.headers.authorization;
    
    if (!token) {
        return res.status(400).send("please provide admin token");
    }

    const payload = verifyToken(token);
    
    if (!payload || payload.userType != "admin") {
        return res.status(400).send("please provide admin token");
    }
    
    req.auth = payload;
    next();
}