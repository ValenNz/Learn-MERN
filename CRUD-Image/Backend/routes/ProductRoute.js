/* Import Module */
import express from "express";

/* Import Controllers */
import {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
} from '../controllers/ProductController.js'

import { verifyUser } from "../middleware/AuthUser.js";

/* Menggunakan module */
const app = express.Router()

/* Membaut endpoint */
app.get('/',verifyUser,getProducts)
app.get('/:id',verifyUser,getProductById)
app.post('/',verifyUser,addProduct)
app.patch('/:id',verifyUser,updateProduct)
app.delete('/:id',verifyUser,deleteProduct)

/* Export file ProductRoute */
export default app