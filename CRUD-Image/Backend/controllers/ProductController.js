/* Import Module */
import Product from "../models/ProductModel.js ";
import User from "../models/UserModel.js";
import path from "path";     //  jalur yang mencatat node apa sajakah yang harus dilewati dari root node ke node tertentu.
import fs from "fs";         // file system : module untuk mengelola file
import {Op} from "sequelize";

/* Function CRUD */

/* READ */
export const getProducts = async(req,res)=>{
    try {
        let response;
        if(req.role === 'admin'){
            response = await Product.findAll({
                attributes:['uuid','name','price','image','url'],
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            })
        } else {
            response = await Product.findAll({
                attributes:['uuid','name','price','image','url'],
                where:{
                    userId: req.userId
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (err){
        res.status(500).json({msg: err.msg});
    }
}

/* READ DETAIL */
export const getProductById = async(req,res)=>{
    try {
        const product = await Product.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!product) return res.status(404).json({msg: "Data tidak ditemukan"});
        let response;
        if(req.role === "admin"){
            response = await Product.findOne({
                attributes:['uuid','name','price','image','url'],
                where:{
                    id: product.id
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Product.findOne({
                attributes:['uuid','name','price','image','url'],
                where:{
                    [Op.and]:[{id: product.id}, {userId: req.userId}]
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({msg: err.msg});
    }
}

/* CREATE */
export const addProduct = async (req, res)=>{
    /* Seleksi kondisi  */
    if(req.files === null) return res.status(400).json({msg: "No File Uploaded"}); // jika user tidak mengirim file maka kirim No File Uploaded

    /* Menangkap Request */
    const {name, price} = req.body
    const file = req.files.file;

    /* Mengelola file */
    const fileSize = file.data.length; // Menghitung ukuran file dari panjang 
    const ext = path.extname(file.name); // Deklarasi letak jalur (akses jalur file)
    const fileName = file.md5 + ext;    // Deklarasi nama file baru
    const url = `${req.protocol}://${req.get("host")}/images/foto_product/${fileName}`; // Sebagai url / link unutk acc file
    const allowedType = ['.png','.jpg','.jpeg']; // Penyetujuan type file

    /* Filter File */
    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"}); // jika file tidak sesuai dengan tipe maka tampilkan invalid massage
    if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"}); // jika ukuran file lebih dari 5 mb maka tampilkan image must be less than 5 mb

    /* Melkaukan Move Image (menyimopan image) */
    file.mv(`./public/images/foto_product/${fileName}`, async(err)=>{ // mengarahkan ke dalam folder penyimpan image
        if(err) return res.status(500).json({msg: err.msg}); // jika err tampilkan err
        try {
            await Product.create({name: name,price : price, image: fileName, url: url, userId: req.userId});
            res.status(201).json({msg: "Product Created Successfuly"});
        } catch (err) {
            res.status(500).json({msg: err.msg});
        }
    })
}

/* UPDATE */
export const updateProduct = async(req,res)=>{
    try{
        const product = await Product.findOne({
            /* Menangkap berdasrkan id yang dikirm oleh user */
            where:{
                uuid : req.params.id
            }
        });
        if(!product) return res.status(404).json({msg: "No Data Found"}); // jika id tidak ditemuakn tampilkan Data Not Foubd
        
        let fileName = ""; // Membuat var menyimpan file (kosongan)
    
        /* Seleksi kondisi upload file  */
        if(req.files === null){ // jika user tidak kirim file tampilakn eror
            fileName = product.image;
        }else{
            const file = req.files.file;                 // menangkpa req dari user
            const fileSize = file.data.length;           // Menghitung ukuran file dari panjang 
            const ext = path.extname(file.name);         // Deklarasi letak jalur (akses jalur file)
            fileName = file.md5 + ext;                   // Deklarasi nama file baru
            const allowedType = ['.png','.jpg','.jpeg']; // Penyetujuan type file
    
            /* Filter File */
            if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"}); // jika file tidak sesuai dengan tipe maka tampilkan invalid massage
            if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"}); // jika ukuran file lebih dari 5 mb maka tampilkan image must be less than 5 mb
    
            const filepath = `./public/images/foto_product/${product.image}`; // Membuat path / lokasi dari file 
            fs.unlinkSync(filepath);    // Melakukan penghapusan terhadap file
    
            /* Melakukan moving file */
            file.mv(`./public/images/foto_product/${fileName}`, (err)=>{
                if(err) return res.status(500).json({msg: err.msg});
            });
        }
    
        /* Menangkpa req dari user */
        const {name, price} = req.body;
        const url = `${req.protocol}://${req.get("host")}/images/foto_product/${fileName}`;
        
        if(req.role === "admin") {
            await Product.update({name: name, price : price, image: fileName, url: url},{
                /* Cari berdasarkan id yang dikirim */
                where:{
                    id: req.params.id
                }
            });
        } else {
            if(req.userId !== product.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Product.update({name: name, price : price, image: fileName, url: url},{
                where:{
                    [Op.and]:[{id: product.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Product updated successfuly"});
    } catch (err){
        res.status(500).json({msg: err.msg});
    }
    
}

/* DELETE */
export const deleteProduct = async(req, res)=>{
    try {
        const product = await Product.findOne({
            where:{
                uuid: req.params.id
            }
        });

        if(!product && req.role === "admin"){
            await Product.destroy({
                where:{
                    id: product.id
                }
            });
        }if (product && req.role === "admin"){
            let delImgName = product.image
            const filepath = `./public/images/foto_product/${delImgName}`;
            fs.unlinkSync(filepath);
            await Product.destroy({
                where:{
                    id: product.id
                }
            });
        }else {
            if(req.userId !== product.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Product.destroy({
                where:{
                    [Op.and]:[{id: product.id}, {userId: req.userId}]
                }
            });
        }


        res.status(200).json({msg: "Product deleted successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}






