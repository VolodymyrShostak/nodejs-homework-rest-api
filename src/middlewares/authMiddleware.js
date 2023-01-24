const jwt = require("jsonwebtoken");
const { NotAuthorizedError } = require("../helpers/errors");
const User = require("../models/userModel");
const { JWT_SECRET } = process.env;
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
   const [bearer, token] = req.headers.authorization?.split(" ") ?? [];
   try {
     if (bearer !== "Bearer") {
       throw new NotAuthorizedError("Not authorized1");
     }
     const { id } = jwt.verify(token, process.env.JWT_SECRET);
     const user = await User.findById(id);
    
     if (!user ) {
       throw new NotAuthorizedError("Not authorized2");
     }

     req.user = user;
     next();
   } catch (error) {
     next(new NotAuthorizedError(error.message));
   }
};

module.exports = { authMiddleware };
