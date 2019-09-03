const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next) {
    var token = req.headers['authorization'];
    if(token.startsWith('Bearer '))
        token = token.slice(7, token.length);
    else
        return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
        req.userId = decoded.id;
        next();
    });
}

module.exports = verifyJWT;
  