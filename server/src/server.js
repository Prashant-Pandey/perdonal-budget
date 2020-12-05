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

app.use(cookieParser());

app.get('/', (req, res) => {
  res.redirect('http://localhost:3001');
});

// professor's solution error would come if he'd log in using second user

app.use('/auth', cors({
  origin: ['http://localhost:3001'],
  preflightContinue: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Authorization'],
  credentials: true
}), require('./routes/auth.routes'));

app.use(cors({ origin: 'http://localhost:3001' }));

app.use('/budget', jwtMW, require('./routes/budget.routes'));

app.use('/budget-type', jwtMW, require('./routes/budget.types.routes'));

app.get('/api/settings', jwtMW, (req, res) => {
  res.json({
    success: true,
    message: 'Secret settings content'
  });
});

app.use(function (err, req, res, next) {
  console.log(req.headers);
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
