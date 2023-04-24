/* Import Module */
import User from "../models/UserModel.js";
import path from "path";     //  jalur yang mencatat node apa sajakah yang harus dilewati dari root node ke node tertentu.
import fs from "fs";         // file system : module untuk mengelola file
import argon, { hash }  from "argon2"; // melakukan hash password
/* Function CRUD */

/* READ */
export const getUsers = async(req,res)=>{
    try {
        const response = await User.findAll({
            attributes: ['uuid','name','email','role','image']
        })
        res.status(200).json(response)
    } catch (err){
        res.status(500).json({msg: err.msg})
    }
}

/* READ DETAIL */
export const getUserById = async(req,res)=>{
    try {
        const response = await User.findOne({
            attributes: ['uuid','name','email','role','image'],
            /* Cari berdasarkan id yang dikirim user */
            where: {
                uuid : req.params.id
            }
        })
        res.status(200).json(response)
    } catch (err){
        res.status(500).json({msg: err.msg})
    }
}

/* CREATE */
export const addUser = async (req, res)=>{
        /* Seleksi kondisi  */
        if(req.files === null) return res.status(400).json({msg: "No File Uploaded"}); // jika user tidak mengirim file maka kirim No File Uploaded

    /* Menangkap Request */
    const {name, email, password, confPassword, role} = req.body
    const file = req.files.file;
    
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    const hashPassword = await argon.hash(password);

    /* Mengelola file */
    const fileSize = file.data.length; // Menghitung ukuran file dari panjang 
    const ext = path.extname(file.name); // Deklarasi letak jalur (akses jalur file)
    const fileName = file.md5 + ext;    // Deklarasi nama file baru
    const url = `${req.protocol}://${req.get("host")}/images/foto_user/${fileName}`; // Sebagai url / link unutk acc file
    const allowedType = ['.png','.jpg','.jpeg']; // Penyetujuan type file

    /* Filter File */
    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"}); // jika file tidak sesuai dengan tipe maka tampilkan invalid massage
    if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"}); // jika ukuran file lebih dari 5 mb maka tampilkan image must be less than 5 mb

    /* Melkaukan Move Image (menyimopan image) */
    file.mv(`./public/images/foto_user/${fileName}`, async(err)=>{ // mengarahkan ke dalam folder penyimpan image
        if(err) return res.status(500).json({msg: err.msg}); // jika error tampilkan error
        try {
            await User.create(
                {
                    name: name, 
                    email: email, 
                    password: hashPassword, 
                    role: role, 
                    image: fileName, 
                    url: url
                }
                    );
            res.status(201).json({msg: "User Created Successfuly"});
        } catch (err) {
            console.log(err.msg);
        }
    })
}

/* UPDATE */
export const updateUser = async(req,res)=>{
    const user = await User.findOne({
        /* Menangkap berdasrkan id yang dikirm oleh user */
        where:{
            uuid : req.params.id
        }
    });

    if(!user) return res.status(404).json({msg: "Data User tidak ditemukan"}); // jika id tidak ditemuakn tampilkan Data Not Foubd

    const {name, email, password, confPassword, role} = req.body
    let fileName = ""; // Membuat var menyimpan file (kosongan)

    /* Seleksi kondisi upload file  */
    if(req.files === null){ // jika user tidak kirim file tampilakn eror
        fileName = user.image;
    }else{
        const file = req.files.file;                 // menangkpa req dari user
        const fileSize = file.data.length;           // Menghitung ukuran file dari panjang 
        const ext = path.extname(file.name);         // Deklarasi letak jalur (akses jalur file)
        fileName = file.md5 + ext;                   // Deklarasi nama file baru
        const allowedType = ['.png','.jpg','.jpeg']; // Penyetujuan type file

        /* Filter File */
        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"}); // jika file tidak sesuai dengan tipe maka tampilkan invalid massage
        if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"}); // jika ukuran file lebih dari 5 mb maka tampilkan image must be less than 5 mb

        const filepath = `./public/images/${user.image}`; // Membuat path / lokasi dari file 
        fs.unlinkSync(filepath);    // Melakukan penghapusan terhadap file

        /* Melakukan moving file */
        file.mv(`./public/images/${fileName}`, (err)=>{
            if(err) return res.status(500).json({msg: err.msg});
        });
    }

    /* Menangkpa req dari user */
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

    /* Seleksi kondisi ganti password */
    let hashPassword
    if(password === "" || password === null){
        hashPassword = user.password
    } else {
        hashPassword = await argon.hash(password)
    }
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});


    try {
        await User.update(
            {
                name: name, 
                email: email, 
                password: hashPassword, 
                role: role, 
                image: fileName, 
                url: url
            }
            ,{
            /* Cari berdasarkan id yang dikirim */
            where:{
                uuid: req.params.id
            }
        });
        res.status(200).json({msg: "User Updated Successfuly"});
    } catch (err) {
        console.log(err.msg);
    }
}

/* DELETE */
export const deleteUser = async(req,res)=>{
    const user = await User.findOne({
        /* Cari berdasrkan id yang dikirm  */
        where: {
            uuid : req.params.id
        }
    })
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"})

    try {
        const filepath = `./public/images/foto_user/${user.image}` // mennagkap lokasi file disimpan
        fs.unlinkSync(filepath) // melakukan penghapusan terhadap file
        await User.destroy({
            where: {
                uuid : req.params.id
            }
        })
        res.status(200).json({msg: "User Deleted Success"})
    } catch (err) {
        console.log(err.msg)
    }
}






