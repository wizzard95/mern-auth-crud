import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";


export const authRequired = (req, res, next) => {
    /* console.log(req.headers); */
    const { token } = req.cookies;
    const authHeader = req.headers.authorization;
    const bearerToken = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    
    const finalToken = token || bearerToken;
    
    if(!finalToken)
        return res.status(401).json({message: "NO TOKEN, AUTHORIZATION DENIED"});

    jwt.verify(finalToken, TOKEN_SECRET, (err, user) => {
        if(err) return res.status(403).json({message: "INVALID TOKEN"})
        
        req.user = user;
        next();
    })
}