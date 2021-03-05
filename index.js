'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');

const { PORT, CLIENT_ORIGIN, DATABASE_URL } = require('./config');
const { dbConnect } = require('./db-mongoose');
// const {dbConnect} = require('./db-knex');
const localStrategy = require('./passport/local');
const jwtStrategy = require('./passport/jwt');

const app = express();
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const mediaRoutes = require('./routes/media');
const postRoutes = require('./routes/post');


app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

console.log('this is the client origin', CLIENT_ORIGIN, DATABASE_URL)

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

passport.use(localStrategy);
passport.use(jwtStrategy);
//now you have to protect the endpoints
app.use(express.json());


app.use('/api/users', userRoute);

app.use('/api', authRoute);

app.use('/api/media', mediaRoutes);

app.use('/api/user/post', postRoutes);

app.use((err,req,res,next) => {
  res.status(err.status || 500);

  res.json({
    message: err.message,
    error: err
  });
});

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };
