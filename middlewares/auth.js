import jwt from "jsonwebtoken";
const SECRET = "MEDIA.NETTOKENS";

export const auth = (req,res,next) => {
    try {
        let token = req.cookies["auth"];
        if(!token){
            token = req.headers.authorization;
            token = token.split(" ")[1];
        }
        if(token){
            let user = jwt.verify(token,SECRET);
            req.userId = user.id;
        }
        else{
            res.status(401).json({
                message: "Missing Token!"
            });
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            message: "Unauthorized User"
        });
    }
}