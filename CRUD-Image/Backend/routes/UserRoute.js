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

/* Menggunakan module */
const app = express.Router()

/* Membaut endpoint */
app.get('/',getUsers)
app.get('/:id',getUserById)
app.post('/',addUser)
app.patch('/:id',updateUser)
app.delete('/:id',deleteUser)

/* Export file ProductRoute */
export default app