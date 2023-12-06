const jwt = require('jsonwebtoken');
const { SECRET } = require('../utils/config');


const verifyToken = async (req, res, next) => {

    const bearerToken = req.headers['authorization'];
    if (typeof bearerToken !== 'undefined') {
        req.token = bearerToken.split(" ")[1];
        try {
            const data = await jwt.verify(req.token, SECRET);
            console.log(data);
            next();

        } catch (error) {
            next({ name: "InvalidTokenError", message: "El token es invalido" });
        }
    }
    else {
        next({ name: "TokenError", message: "Se requiere el token" });
    }
}

module.exports = {
    verifyToken
}