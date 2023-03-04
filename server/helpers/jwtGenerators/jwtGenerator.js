const secureConfig = require('../../secureConfig.json');
const jwt = require('jsonwebtoken');

const JwtGenerator = (params) => {
    const token = jwt.sign(
        { ...params},
        secureConfig.SECRET_KEY,
        { expiresIn: '5040h' }
    );
    return token;
}

module.exports = JwtGenerator;