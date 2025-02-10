import express from "express";
import session from "express-session";

const app = express();

const sesija = app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

export default sesija;
