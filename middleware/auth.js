const jwt = require("jsonwebtoken");


//checking token

const auth = (req,res,next)=>{
    //checking header
    let jwtToken = req.header("Authorization");

    if(!jwtToken) return res.status(400).send("Authentication rejected: there is not a token")

    //if jwt exists, we split the payload

    jwtToken = jwtToken.split(" ")[1];

    if(!jwtToken) return res.status(401).send("Authentication rejected: there is not a token")

    //cheking the token with own.sing

    try{
        const payload = jwt.verify(jwtToken,"Andvar");
        req.user = payload;
        next();
    }
    catch(error){
        return res.status(401).send("Authentication rejected: Invalid token")
    }

}

module.exports = auth;