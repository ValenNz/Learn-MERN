/* Import Module */
import express from "express";

/* Import Controllers */
import {
    getUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
} from '../controllers/UserControllers.js'

import { adminOnly, verifyUser } from "../middleware/AuthUser.js";

/* Menggunakan module */
const app = express.Router()

/* Membaut endpoint */
app.get('/',verifyUser,adminOnly,getUsers)
app.get('/:id',verifyUser,adminOnly,getUserById)
app.post('/',verifyUser,adminOnly,addUser)
app.patch('/:id',verifyUser,adminOnly,updateUser)
app.delete('/:id',verifyUser,adminOnly,deleteUser)

/* Export file ProductRoute */
export default app