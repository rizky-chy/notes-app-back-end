import TokenManager from '../security/token-manager.js';
import response from '../utils/response.js';

async function authenticateToken(req, res, next) {
  const token = req.headers.authorization;
  if (token && token.indexOf('Bearer ') !== -1) {
    try {
      const user = await TokenManager.verify(token.split('Bearer ')[1], process.env.ACCESS_TOKEN_KEY);
      req.user = user;
      return next();
    } catch (error) {
      return response(res, 401, error.message, null);
    }
  }

  return response(res, 401, 'Unauthorized', null);
};

export default authenticateToken;
// import TokenManager from '../security/token-manager.js';
// import response from '../utils/response.js';

// async function authenticateToken(req, res, next) {
//   const authHeader = req.headers.authorization;

//   // Cek apakah header Authorization ada dan formatnya benar (Bearer <token>)
//   if (authHeader && authHeader.startsWith('Bearer ')) {
//     try {
//       const token = authHeader.split(' ')[1];
//       const user = await TokenManager.verifyAccessToken(token);

//       req.user = user;
//       return next();
//     } catch (error) {
//       return response(res, 401, 'Access token tidak valid', null);
//     }
//   }

//   return response(res, 401, 'Akses ditolak, token tidak ditemukan', null);
// };

// export default authenticateToken;