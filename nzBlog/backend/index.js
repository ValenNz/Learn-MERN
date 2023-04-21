const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path') // unutk meengetahui posisi folder dimana
const app = express()
const cors = require('cors')

const authRoutes = require('./src/routes/authRouter')
const blogRoutes = require('./src/routes/blogRouter')

app.use(cors())

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images') // call back (success akan kirim ke folder image) kalau di src maka src/images
    },
    filename: (req,file, cb) => {
        cb(null,new Date().getTime() + '-' + file.originalname)// format penamaan file
    }
})


/* Membuat file baru untuk menyimpan file iumage */
const fileFilter = (req,file,cb)=> {
    if(
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg' 
    ){  
        cb(null, true) // acc filer
    } else {
        cb(null, false) // tolak file
    }
}

app.use(bodyParser.json())

/* Membuat middleware */
app.use('/images', express.static(path.join(__dirname, 'images'))) // dirname (lokasi project berda) jika terjadi pemanggilan url maka akan melakukan tindakan membuat folder static untuk diakases diluar
app.use(multer({storage: fileStorage, fileFilter:fileFilter}).single('image')) // menentukan opengiuriman singgle dan harus bernama image
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST,PUT, PATCH, DELETE, OPTIONS ')
    res.setHeader('Access-Control-Allow-Methods', 'Content-Type Authorization')
    next() 
})

app.use('/v1/auth', authRoutes )
app.use('/v1/blog', blogRoutes )

/* Membuat handke error */
app.use(((err, req,res,next) => {
    const status = err.errorStatus || 500
    const message = err.message;
    const data = err.data
    res.status(status).json(
        {
            message: message, 
            data: data
        }
    )
}))

mongoose.connect('mongodb://nuevalen:3kSr1zWLkivxJj4i@ac-dxaejcl-shard-00-00.mwp0bxh.mongodb.net:27017,ac-dxaejcl-shard-00-01.mwp0bxh.mongodb.net:27017,ac-dxaejcl-shard-00-02.mwp0bxh.mongodb.net:27017/blog?ssl=true&replicaSet=atlas-kqguf7-shard-0&authSource=admin&retryWrites=true&w=majority')
.then(() => {
    app.listen(4000., () => {
        console.log('Server telah berjalan di port 4000 dan tersambung ke database')
    })
})
.catch((err) => {
    console.log('erorr')
    console.log(err)
})



