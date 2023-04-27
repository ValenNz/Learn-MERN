/* Import Module */
import User from "../models/UserModel.js";
import argon from "argon2"; // melakukan hash password

/* Function Login */
export const Login = async (req, res) =>{
    /* Mencari berdasrkan email */
    const user = await User.findOne({
        where: { 
            email: req.body.email
        }
    });
    /* Seleksi kondisi login */
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"}); 

    /* Mencocokan dengan password dan confirm password */
    const match = await argon.verify(user.password, req.body.password); // menyamakan dengan passworrd db dengan input
    if(!match) return res.status(400).json({msg: "Wrong Password"});

    /* Menangkap request user */
    req.session.userId = user.uuid; // set seassion
    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const image = user.image;
    const url = user.url;
    const role = user.role;
    res.status(200).json({uuid, name, email, role,image, url}); // lakukan session (menyimpan ketiuak kita login)
}

/* Function GET user */
/* lakukan session (menyimpan ketiuak kita login) */
export const Profile = async (req, res) =>{
    if(!req.session.userId){
        return res.status(401).json({msg: "Mohon login ke akun Anda!"});
    }
    const user = await User.findOne({
        attributes:['uuid','name','email','role','image','url'],
        where: {// mencari data berdasrkan uuid karna session yang di set menggunakan uuid
            uuid: req.session.userId 
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    res.status(200).json(user);
}

/* Function Logout */
export const logOut = (req, res) =>{
    /* Menghapus session */
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg: "Tidak dapat logout"});
        res.status(200).json({msg: "Anda telah logout"});
    });
}