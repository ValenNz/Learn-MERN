/* Import Module */
import express from "express";
import FileUpload from "express-fileupload";
import cors from "cors"
import ProductRoute from "./routes/ProductRoute.js"

/* Deklarasi express */
const app = express()


/* Menggunakan Module */
app.use(cors())
app.use(express.json())
app.use(FileUpload())
app.use(express.static("public"))

/* Import Routes */
app.use('/product',ProductRoute)

/* Menjalankan Server  */
app.listen(5000, ()=> {
    console.log('Server up and runing in port 5000')
})