const router = require('express').Router();
const jwt = require('jsonwebtoken');
const authService = require('../services/auth.services');
const UserObject = require('../models/User').UserObject;
const { body, validationResult } = require('express-validator');

router.get('/', (req, res) => {
  res.json({ one: 'one' });
});

function generateAndSendToken(authRes) {
  // generating cookie for saving token
  const ttl = 60000;
  const tokenObj = {
    id: authRes._id,
    email: authRes.email,
    password: authRes.passowrd
  };
  const token = jwt.sign(tokenObj, process.env.AUTH_SECRET, {
    expiresIn: ttl
  });
  return [token, ttl];
}

function generateErrorMessage(errArray) {
  let msg = '';
  for (let i = 0; i < errArray.length; i++) {
    msg += `${errArray[i].msg} of ${errArray[i].param}, `;
  }
  return msg;
}

router.post('/login', [
  // email and password validation and sanitization
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 5 }).trim().unescape()
], async (req, res) => {
  const errors = validationResult(req);
  // if inputs are not sanitized
  if (!errors.isEmpty()) {
    const msg = generateErrorMessage(errors.array());
    return res.status(400).json({
      success: false,
      error: true,
      message: msg
    });
  }
  // we have sanitized inputs
  const { email, password } = req.body;
  const authRes = await authService.verifyAuth(email, password);
  // if user is not valid
  if (authRes.err) {
    return res.status(authRes.err.status).json({
      success: false,
      error: true,
      message: authRes.err.message
    });
  }

  // valid response
  const [token, ttl] = generateAndSendToken(authRes);
  res.cookie('token', token, {
    maxAge: ttl
  });
  return res.json({ success: true, ttl, error: false });
});

router.post('/signup', [
  // sanitize and validate
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 5 }).trim().unescape(),
  body('phone').isString().optional({ nullable: true })

], async (req, res) => {
  const errors = validationResult(req);
  // if inputs are not sanitized
  if (!errors.isEmpty()) {
    const msg = generateErrorMessage(errors.array());
    return res.status(400).json({
      success: false,
      error: true,
      message: msg
    });
  }
  // we have sanitized inputs
  const userObj = UserObject(req.body);
  const authRes = await authService.signupUser(userObj);
  // if user is not valid
  if (authRes.err) {
    return res.status(authRes.err.status).send({
      success: false,
      error: true,
      message: authRes.err.message
    });
  }

  // valid response
  const [token, ttl] = generateAndSendToken(authRes);
  res.cookie('token', token, {
    maxAge: ttl
  });
  return res.json({ success: true, ttl, err: null });
});

router.post('/refresh', (req, res) => {
  if (!req.headers.authorization) {
    return res.status(400).json({ success: false, err: 'not authorized' });
  }
  const authToken = req.headers.authorization.split(' ')[1];
  console.log(req.headers.authorization);
  if (authToken === '' ||
    authToken === 'null' || !jwt.verify(authToken, process.env.AUTH_SECRET)) {
    return res.status(400).json({ success: false, err: 'invalid token' });
  }
  const decodedToken = jwt.decode(authToken);
  if (decodedToken.exp < Date.now() / 1000) {
    res.status(401).json({
      success: false,
      err: 'Token Already Expired'
    });
    return;
  }
  // valid response
  res.cookie('token', authToken, {
    maxAge: 6000
  });
  return res.json({ success: true, ttl: 60000, err: null });
});

module.exports = router;
