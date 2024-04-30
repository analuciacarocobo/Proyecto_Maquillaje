import express from "express";
import bodyParser from 'body-parser';

import register from './controllers/register-controller';
import auth from './controllers/auth-controller';

import dotenv from "dotenv";
dotenv.config();

const app = express().use(bodyParser.json());

app.use('/register', register);
app.use('/auth', auth);

const PORT = process.env.PORT || 10101;

app.listen(PORT, () => {
  console.log("Servidor ejecutándose en el puerto: ", PORT);
}).on("error", (error) => {
  throw new Error(error.message);
});