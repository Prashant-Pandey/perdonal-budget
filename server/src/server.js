const app = require('express')();
const bodyParser = require('body-parser');
require('dotenv').config();
const jwtMW = require('./middlewares/auth.middleware');

const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Headers', 'Content-type, Authorization');
  next();
});

app.get('/', (req, res) => {
  res.json({ site: 'working' });
});

// professor's solution error would come if he'd log in using second user

app.use('/auth', require('./routes/auth.routes'));

app.get('/api/dashboard', jwtMW, (req, res) => {
  res.json({
    success: true,
    message: 'Secret dashboard content'
  });
});

app.get('/api/settings', jwtMW, (req, res) => {
  res.json({
    success: true,
    message: 'Secret settings content'
  });
});

// app.get('*', (req, res) => {
//   res.redirect('/');
// });

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({
      success: false,
      err
    });
  } else {
    next(err);
  }
});

app.listen(3000, () => {
  console.log(`Yay! app started at ${port}`);
});
