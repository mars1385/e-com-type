// -----------------imports-----------------
import 'colors';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import dataBaseConnection from './configs/db.config';
import { errorHandler } from './middleware/errorHandler';
import session from 'express-session';
import { redisClient } from './middleware/cache';
import connectRedis from 'connect-redis';
import authRouter from './routers/authRouter';
import categoryRouter from './routers/categoryRouter';
// -----------------end--------------------

dotenv.config();
//
const app = express();

// redis & session
const redisSessionStore = connectRedis(session);
app.use(
  session({
    name: process.env.COOKIE_NAME,
    store: new redisSessionStore({
      client: redisClient,
      disableTouch: true,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
    },
    secret: process.env.SESSION_SECRET!,
    saveUninitialized: false,
    resave: false,
  })
);

dataBaseConnection();

// middleware
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// routes
app.use('/api/auth', authRouter);
app.use('/api/category', categoryRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`server is running in ${process.env.NODE_ENV} mode and on prot : ${PORT}`.blue.underline.bold);
});

process.on('unhandledRejection', (error: Error) => {
  console.log(`Error : ${error.message}`.red);
  server.close(() => process.exit(1));
}); //end
