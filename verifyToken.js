import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
export function verifyToken(req, res, next) {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    console.log("HHHHHHHHHHHHH");
    console.log(token);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) res.status(403).json("Token is not Valid");
      else {
        req.user = user;
        next();
      }
    });
  } else {
    res.status(403).json("You are Not Authenticated");
  }
}

// module.exports = verifyToken;
