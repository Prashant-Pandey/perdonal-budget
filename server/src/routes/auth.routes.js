const router = require('express').Router();
const jwt = require('jsonwebtoken');
const authService = require('../services/auth.services');
const UserObject = require('../models/User').UserObject;
const { body, validationResult } = require('express-validator');

router.get('/', (req, res) => {
  res.json({ one: 'one' });
});

router.post('/login', [
  // email and password validation and sanitization
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 5 }).trim().unescape()
], async (req, res) => {
  const errors = validationResult(req);
  // if inputs are not sanitized
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // we have sanitized inputs
  const { email, password } = req.body;
  const authRes = await authService.verifyAuth(email, password);

  // if user is not valid
  if (authRes.err) {
    return res.status(authRes.err.status).json({
      success: false,
      token: null,
      err: authRes.err
    });
  }

  // generating cookie for saving token
  const ttl = 360 * 60 * 60000;
  const tokenObj = {
    id: authRes._id,
    email: authRes.email,
    password: authRes.passowrd
  };
  const token = jwt.sign(tokenObj, process.env.AUTH_SECRET, {
    expiresIn: ttl
  });
  res.cookie('token', token, {
    maxAge: ttl
  });
  return res.json({ success: true, err: null });
});

router.post('/signup', [
  // sanitize and validate
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 5 }).trim().unescape(),
  body('countryCode').isNumeric().optional({ nullable: true }),
  body('phone').isString().optional({ nullable: true })

], async (req, res) => {
  const errors = validationResult(req);
  // if inputs are not sanitized
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // we have sanitized inputs
  const userObj = UserObject(req.body);
  const authRes = await authService.signupUser(userObj);

  // if user is not valid
  if (authRes.err) {
    return res.status(authRes.err.status).json({
      success: false,
      token: null,
      err: authRes.err.message
    });
  }

  // generating cookie for saving token
  const ttl = 360 * 60 * 60000;
  const tokenObj = {
    id: authRes._id,
    email: authRes.email,
    password: authRes.passowrd
  };
  const token = jwt.sign(tokenObj, process.env.AUTH_SECRET, {
    expiresIn: ttl
  });
  res.cookie('token', token, {
    maxAge: ttl
  });
  res.json({ success: true, err: null, authRes });
});

module.exports = router;
