/* Import Module */
import express from "express";
import FileUpload from "express-fileupload";
import session from "express-session";
import cors from "cors"
import dotenv from "dotenv"
import db from "./config/database.js";
import SequelizeStore from "connect-session-sequelize";

/* Deklarasi dotenv dan express */
dotenv.config()
const app = express()

/* Menggunakan session */
const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
    db: db
});

/* Menggunakan Module */
app.use(cors({
    credentials: true, // Frontend dapat mengirimklan cockie beserta credentialnya 
    // -> Credential :  dokumen, surat, atau sertifikat yang merinci kualifikasi, kompetensi, atau otoritas yang diberikan kepada seseorang dari suatu otoritas yang dipercaya
    origin: 'http://localhost:3000' // domain yang diizinkan untuk diizinkan mengakse API
}))
app.use(express.json()) // dapat menerima jasa dalam bentuk json
app.use(FileUpload()) // dapat melakukan proses upload (menggunakan fn fielUpload)
app.use(express.static("public")) // supaya foto dapat diakses menggunkan url
app.use(session({ // depedency session
    secret: process.env.SESS_SECRET,  // Call key
    resave: false,  // tanpa dyarat
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: "auto" // keamanan akan secara otomatis
    }
}))


/* Import Routes */
import ProductRoute from "./routes/ProductRoute.js"
app.use('/product',ProductRoute)
import UserRoute from "./routes/UserRoute.js"
app.use('/user',UserRoute)
import AuthRoute from "./routes/AuthRoute.js";
app.use(AuthRoute);


/* Menjalankan Server  */
app.listen(process.env.APP_PORT, ()=> {
    console.log('Server up and running in port 5000');
});