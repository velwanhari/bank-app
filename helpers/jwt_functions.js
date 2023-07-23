const path = require("path");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config({ path: path.join(__dirname, "../.env") });

const createToken = (payload) =>{
    var token = jwt.sign(payload, process.env.JWT_KEY);
    return token
}

const verifyToken = (token) => {
    try {
        var payload = jwt.verify(token, process.env.JWT_KEY);
        return payload;
    } catch (error) {
        return false
    }
}

module.exports = {
    createToken,
    verifyToken
}