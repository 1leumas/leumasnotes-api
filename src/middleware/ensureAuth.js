const {verify} = require("jsonwebtoken");
const authConfig = require("../configs/auth");

function ensureAuth(request, response, next) {
    console.log('ensureAuth middleware called');
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return response.status(401).json('JWT Token not Informed');
    }
  
    const [, token] = authHeader.split(' ');
  
    try {
      const { sub: user_id } = verify(token, authConfig.jwt.secret);
  
      request.user = {
        id: Number(user_id),
      };
      console.log('Authenticated user:', request.user);
  
      return next();
    } catch (error) {
      console.error('Error during JWT verification:', error);
      return response.status(401).json('Invalid JWT Token');
    }
  }

module.exports = ensureAuth;