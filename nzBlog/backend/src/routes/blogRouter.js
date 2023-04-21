const express = require('express')
const {body} = require('express-validator')

const app = express()

const blogController = require('../controllers/blogController')

app.post('/post',[
    body("title").isLength({min: 5}).withMessage('Input title kurang dari 5 huruf'),
    body("body").isLength({min: 5}).withMessage('INput body kurang dari 5 huruf')],
blogController.createBlogPost ) // batas minimal 5

app.get('/posts', blogController.getAllBlogPost)
app.get('/post/:postId',blogController.getBlogPostById)
app.put('/post/:postId',[
    body("title").isLength({min: 5}).withMessage('Input title kurang dari 5 huruf'),
    body("body").isLength({min: 5}).withMessage('INput body kurang dari 5 huruf')],
blogController.updateBlogPost)

app.delete('/post/:postId', blogController.deleteBlogPost)

module.exports = app

