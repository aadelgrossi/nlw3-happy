import 'reflect-metadata';
import express from 'express';
import 'express-async-errors'
import routes from './routes';
import morgan from 'morgan';
import path from 'path'
import './database';
import errorHandler from './errors/handler';

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(
  "/uploads",
  express.static(path.join(__dirname, "..", "tmp", "uploads"))
);
app.use(routes);
app.use(errorHandler)

export default app;
