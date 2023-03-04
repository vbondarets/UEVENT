const secureConfig = require('../../secureConfig.json');
const jwt = require('jsonwebtoken');

const resetJwtGenerator = (id, email) => {
    const token = jwt.sign(
        { id: id, email: email },
        secureConfig.SECRET_KEY_FOR_EMAIL,
        { expiresIn: '5040h' }
    );
    return token;
}

module.exports = resetJwtGenerator;