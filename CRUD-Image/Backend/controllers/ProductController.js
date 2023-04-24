/* Import Module */
import Product from "../models/ProductModel.js ";
import path from "path";     //  jalur yang mencatat node apa sajakah yang harus dilewati dari root node ke node tertentu.
import fs from "fs";         // file system : module untuk mengelola file

/* Function CRUD */

/* READ */
export const getProducts = async(req,res)=>{
    try {
        const response = await Product.findAll()
        res.json(response)
    } catch (err){
        console.log(err.msg)
    }
}

/* READ DETAIL */
export const getProductById = async(req,res)=>{
    try {
        const response = await Product.findOne({
            /* Cari berdasarkan id yang dikirim user */
            where: {
                id : req.params.id
            }
        })
        res.json(response)
    } catch (err){
        console.log(err.msg)
    }
}

/* CREATE */
export const addProduct = (req, res)=>{
    /* Seleksi kondisi  */
    if(req.files === null) return res.status(400).json({msg: "No File Uploaded"}); // jika user tidak mengirim file maka kirim No File Uploaded

    /* Menangkap Request */
    const {name, price} = req.body
    const file = req.files.file;

    /* Mengelola file */
    const fileSize = file.data.length; // Menghitung ukuran file dari panjang 
    const ext = path.extname(file.name); // Deklarasi letak jalur (akses jalur file)
    const fileName = file.md5 + ext;    // Deklarasi nama file baru
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`; // Sebagai url / link unutk acc file
    const allowedType = ['.png','.jpg','.jpeg']; // Penyetujuan type file

    /* Filter File */
    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"}); // jika file tidak sesuai dengan tipe maka tampilkan invalid massage
    if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"}); // jika ukuran file lebih dari 5 mb maka tampilkan image must be less than 5 mb

    /* Melkaukan Move Image (menyimopan image) */
    file.mv(`./public/images/${fileName}`, async(err)=>{ // mengarahkan ke dalam folder penyimpan image
        if(err) return res.status(500).json({msg: err.msg}); // jika error tampilkan error
        try {
            await Product.create({name: name, image: fileName, url: url});
            res.status(201).json({msg: "Product Created Successfuly"});
        } catch (err) {
            console.log(err.msg);
        }
    })
}

/* UPDATE */
export const updateProduct = async(req,res)=>{
    const product = await Product.findOne({
        /* Menangkap berdasrkan id yang dikirm oleh user */
        where:{
            id : req.params.id
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

        const filepath = `./public/images/${product.image}`; // Membuat path / lokasi dari file 
        fs.unlinkSync(filepath);    // Melakukan penghapusan terhadap file

        /* Melakukan moving file */
        file.mv(`./public/images/${fileName}`, (err)=>{
            if(err) return res.status(500).json({msg: err.msg});
        });
    }

    /* Menangkpa req dari user */
    const name = req.body.title;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    
    try {
        await Product.update({name: name, image: fileName, url: url},{
            /* Cari berdasarkan id yang dikirim */
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Product Updated Successfuly"});
    } catch (err) {
        console.log(err.msg);
    }
}

/* DELETE */
export const deleteProduct = async(req,res)=>{
    const product = await Product.findOne({
        /* Cari berdasrkan id yang dikirm  */
        where: {
            id : req.params.id
        }
    })
    if(!product) return res.status(404).json({msg: "No data found"})

    try {
        const filepath = `./public/images/${product.image}` // mennagkap lokasi file disimpan
        fs.unlinkSync(filepath) // melakukan penghapusan terhadap file
        await Product.destroy({
            where: {
                id : req.params.id
            }
        })
        res.status(200).json({msg: "Product Deleted Success"})
    } catch (err) {
        console.log(err.msg)
    }
}






