const secureConfig = require('../../secureConfig.json');
const jwt = require('jsonwebtoken');

function JwtGenerator (params) {
    const token = jwt.sign(
        {...params},
        secureConfig.SECRET_KEY,
        { expiresIn: '5040h' }
    );
    console.log(token);
    return token;
}

module.exports = JwtGenerator;