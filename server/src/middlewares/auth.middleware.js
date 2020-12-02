const jwt = require('jsonwebtoken');
const jwtMW = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      res.status(401).json({
        success: false,
        err: 'UnauthorizedError'
      });
      return;
    }

    const authToken = req.headers.authorization.split(' ')[1];
    if (authToken === '' ||
      authToken === 'null' ||
      !jwt.verify(authToken, process.env.AUTH_SECRET)) {
      res.status(401).json({
        success: false,
        err: 'UnauthorizedError'
      });
      return;
    }

    const decodedToken = jwt.decode(authToken);
    req.user_id = decodedToken.id;
    if (decodedToken.exp < Date.now() / 1000) {
      res.status(401).json({
        success: false,
        err: 'Token Expired'
      });
      return;
    }

    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      err: err.message
    });
  }
};

module.exports = jwtMW;
