var jwt = require('jsonwebtoken');
const secret = "hbhagat123";


const fetchuser = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
        return res.status(401).send({ error: "Please use a valid token" })
    } 
    try{ 
    const data = jwt.verify(token, secret);
    req.user = data.user;
    
    next();
    } catch (error) {
        res.status(401).send({ error: "Please use a valid token" })
    }
}

module.exports = fetchuser