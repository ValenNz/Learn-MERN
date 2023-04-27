/* Import Module */
import express from "express";
import {Login, logOut, Profile} from "../controllers/AuthController.js";

/* Menggunakan modue */
const app = express.Router();

/* Emdpoint */
app.get('/profile', Profile);
app.post('/login', Login);
app.delete('/logout', logOut);

/* Export file */
export default app;