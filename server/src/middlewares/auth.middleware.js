const jwt = require('jsonwebtoken');
const jwtMW = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Error('UnauthorizedError');
    }

    const authToken = req.headers.authorization.split(' ')[1];

    if (authToken === '' ||
            authToken === 'null' ||
            !jwt.verify(authToken, process.env.AUTH_SECRET)) {
      throw new Error('UnauthorizedError');
    }

    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      err
    });
  }
};

module.exports = jwtMW;
