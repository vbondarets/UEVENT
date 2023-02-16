const JwtGenerator = (id, login, email, fullname, role) => {
    const token = jwt.sign(
        { id: id, login: login, email: email, fullname: fullname, role: role },
        secureConfig.SECRET_KEY,
        { expiresIn: '5040h' }
    );
    return token;
}

module.exports = JwtGenerator;