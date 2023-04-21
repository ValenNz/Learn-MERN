const {validationResult} = require('express-validator')
const blogModel = require('../models/blogModel') 
const path = require('path') // unutk meengetahui posisi folder dimana
const fs = require('fs')
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

exports.createBlogPost = (req,res, next) =>{
    
    /* Membuat validasi error */
    const errors = validationResult(req)

    /* Check inputan user */
    if(!errors.isEmpty()){ // Jika validasi error response error
       const err = new Error('Value tidak sesuai')
       err.errorStatus = 400
       err.data = errors.array()    
       throw err
    }

    /* Check upload image */
    if(!req.file) {
        const err = new Error('Image harus diupload')
        err.errorStatus = 422
        throw err
    }

    const title = req.body.title
    const image = req.file.path
    const  body = req.body.body

    /* Create */
    const Posting = new blogModel({
        title: title,
        body: body,
        image:image,
        author: {
            uid: 1,
            name: 'dummy'
        }
    })
    /* Check create */
    Posting.save()
    .then(result => {
        res.status(201).json({
            message: 'Create Blog Post Success',
            data: result
        })
    })
    .catch(err => {
        console.log('err: ', err)
    })
}

exports.getAllBlogPost = (req,res,next) => {
    const currentPage = req.query.page || 1 //page sekarang
    const perPage = req.query.perPage || 5 // berapa yang akan ditampilkan jika client tidak ngirim current perpage maka bagikan data 5

    /* Memberikan informasi jumlah data */
    let totalItems
    blogModel.find()
    .countDocuments()//menghitung jumlah data yang kita miliki
    .then( count => {
        totalItems = count  // total data
        return blogModel.find() //panggil bberapa data
        .skip((parseInt(currentPage) - 1) * parseInt(perPage)) // tidak ada yang diskip
        .limit(parseInt(perPage)) // data yang diberikan berapa
    })
    .then(result => {
        res.status(200).json({
            message: 'Data Blog POst Berhasil ditampilkan semua',
            data: result,
            totalData: totalItems,
            per_Page: parseInt(perPage),
            current_Page: parseInt(currentPage)
        })
    })
    .catch(err => {
        next(err)
    })
}

exports.getBlogPostById  = (req,res,next) => {
    const postId = req.params.postId
    blogModel.findById(postId)
    .then(result => {
        if(!result) {
            const err = new Error('Blog post tidak ditemukan ')
            err.errorStatus = 404
            throw err
        }
        res.status(200).json({
            message: "Data blog post berhasil ditampilkan",
            data: result
        })
    })
    .catch(err => {
        next(err)
    })
}

exports.updateBlogPost = (req,res,next) => {

     /* Membuat validasi error */
     const errors = validationResult(req)

     /* Check inputan user */
     if(!errors.isEmpty()){ // Jika validasi error response error
        const err = new Error('Value tidak sesuai')
        err.errorStatus = 400
        err.data = errors.array()    
        throw err
     }

     let image = "";
 
     /* Check upload image */
     if(req.file) {
         image = req.file.path
         const err = new Error('Image harus diupload')
         err.errorStatus = 422
         throw err
     }
 
     const title = req.body.title

     const  body = req.body.body
     const postId = req.params.postId

     blogModel.findById(postId)
     .then(post => {
        if(!post){
            const err = new Error('Blog Post tidak ditemukan')
            err.errorStatus = 404
            throw err
        }
        post.title = title
        post.body = body

        if(req.file) post.image = image;
        return post.save()
     })
     .then(result => {
        res.status(200).json({
            message: 'update sukses',
            data: result
        })
     })
     .catch(err => {
        next(err)
     })
}

exports.deleteBlogPost = (req,res,next) => {
    const postId = new ObjectId(req.params.postId)  
    blogModel.findById(postId)
    .then(post => {
        if(!post){
            const err = new Error('Blog post tidak ditemukan')
            err.errorStatus = 404
            throw err
        }

        removeImage(post.image)
        return blogModel.findByIdAndDelete(postId)
    })
    .then(result => {
        res.status(200).json({
            message: 'Gambar berhasil dihapus',
            data: result
        })
    })
    .catch(err => {
        next(err)
    })
}

/* Method hapus gambar */   
const removeImage = (filePath) => {
    filePath = path.join(__dirname, '../..', filePath)
    fs.unlink(filePath, err => console.log(err))
    // /User/Dpcuments/LearnProgramming/Mearn/nzblog/images/...
    // dir name : mengetahui dimana direcname berada
}