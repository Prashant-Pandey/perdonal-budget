const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const jwtMW = require('./middlewares/auth.middleware');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true });

const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3001',
  preflightContinue: true,
  credentials: true
}));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.redirect('http://localhost:3001');
});

// professor's solution error would come if he'd log in using second user

app.use('/auth', require('./routes/auth.routes'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.setHeader('Access-Control-Allow-Headers', 'Content-type, Authorization');
  next();
});

app.use('/budget', jwtMW, require('./routes/budget.routes'));

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
