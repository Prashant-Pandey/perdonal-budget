const router = require('express').Router();
const jwt = require('jsonwebtoken');
const authService = require('../services/auth.services');
const UserObject = require('../models/User').UserObject;
const { body, validationResult } = require('express-validator');

router.get('/', (req, res) => {
  res.json({ one: 'one' });
});

function generateAndSendToken(res, authRes) {
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
}

router.post('/login', [
  // email and password validation and sanitization
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 5 }).trim().unescape()
], async (req, res) => {
  const errors = validationResult(req);
  // if inputs are not sanitized
  if (!errors.isEmpty()) {
    return res.status(400).json({ err: errors.array() });
  }
  // we have sanitized inputs
  const { email, password } = req.body;
  const authRes = await authService.verifyAuth(email, password);

  // if user is not valid
  if (authRes.err) {
    return res.status(authRes.err.status).json({
      success: false,
      token: null,
      err: authRes.err.message
    });
  }

  return generateAndSendToken(res, authRes);
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
    let msg = '';
    const errArray = errors.array();
    for (let i = 0; i < errArray.length; i++) {
      msg += `${errArray[i].msg} of ${errArray[i].param}, `;
    }
    return res.status(400).json({ err: msg });
  }
  // we have sanitized inputs
  const userObj = UserObject(req.body);
  const authRes = await authService.signupUser(userObj);
  console.log(authRes);
  // if user is not valid
  if (authRes.err) {
    return res.status(authRes.err.status).send({
      err: authRes.err.message
    });
  }

  return generateAndSendToken(res, authRes);
});

module.exports = router;
