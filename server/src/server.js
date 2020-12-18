const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const jwtMW = require('./middlewares/auth.middleware');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true });
const frontEnd = process.env.CLIENT;
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.get('/', (req, res) => {
  res.redirect(frontEnd);
});

app.use('/auth', cors({
  origin: [frontEnd, 'http://localhost:3000'],
  preflightContinue: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Authorization', 'Set-Cookie'],
  credentials: true
}), require('./routes/auth.routes'));

app.use(cors({ origin: frontEnd }));

app.use('/budget', jwtMW, require('./routes/budget.routes'));

app.use('/budget-type', jwtMW, require('./routes/budget.types.routes'));

app.get('/api/settings', jwtMW, (req, res) => {
  res.json({
    success: true,
    message: 'Secret settings content'
  });
});

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
