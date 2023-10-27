import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

export const authenticate = (req, res, next) => {
  const { token } = req.cookies; 
  if (!token)
    res.status(401).json({ message: "Autenticación denegada, ontenger jwt" });
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "invalid token" });
    req.user = user;
    next();
  });
};
