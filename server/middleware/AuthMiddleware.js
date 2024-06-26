const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
 
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        let token = null;
        if(req.headers.authorization) token = req.headers.authorization.split(' ')[1] // Bearer asfasnfkajsfnjk
        else if(req.query.token) {
            token = req.query.token;
        }
        if (!token) {
            return res.status(401).json({message: "Not authorized"})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        req.user = decoded
        next()
    } catch (e) {
        res.status(401).json({message: "Not authorized"})
    }
};