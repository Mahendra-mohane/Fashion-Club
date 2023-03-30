const jwt = require("jsonwebtoken")

const authenticate = (req,res,next)=>{

const token = req.headers.authorization
if(token){
    jwt.verify(token,"mahendra",(err,decoded)=>{
    if(decoded){
        console.log(decoded)
        req.body.user = decoded.userID
        next()
    }
    else{
        res.send({"msg":"please login first"})
    }

    })
}
else{
    res.send({"msg":"Wrong Inputs"})
}

}

module.exports={
    authenticate
}