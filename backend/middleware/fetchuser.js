var jwt = require('jsonwebtoken');
const JWT_SECRET = 'faizaanisagoodb@y';

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    // console.log(token)
    if (!token) {
        console.log("Helo")
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        
        //Code added by me as it was creating confusion in user and users 
        if(data.users){
            req.user = data.users
        }
        else if(data.user){
            req.user = data.user
        }
        // req.user = data?.users;
        // console.log(req.user)
        next();
    } catch (error) {
        console.log("hello")
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }
}

module.exports = fetchuser;
