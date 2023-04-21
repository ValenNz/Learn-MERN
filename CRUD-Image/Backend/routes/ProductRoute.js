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

/* Menggunakan module */
const app = express.Router()

/* Membaut endpoint */
app.get('/',getProducts)
app.get('/:id',getProductById)
app.post('/',addProduct)
app.patch('/:id',updateProduct)
app.delete('/:id',deleteProduct)

/* Export file ProductRoute */
export default app